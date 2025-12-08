import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';
import { GEMINI_API_KEY } from '../config/environment.config';

@Injectable()
export class GoogleGeminiService {
  private readonly model;
  private readonly logger = new Logger(GoogleGeminiService.name);

  constructor() {

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    this.model = genAI.getGenerativeModel({
      model: 'gemini-flash-latest',
      safetySettings,
    });
  }

  private splitIntoChunks(text: string, maxSize = 5000): string[] {
    const chunks: string[] = [];
    let pos = 0;

    while (pos < text.length) {
      chunks.push(text.slice(pos, pos + maxSize));
      pos += maxSize;
    }
    return chunks;
  }

  private async summarizeChunk(chunk: string, index: number): Promise<string> {
    const prompt = `
      Resuma o texto abaixo de forma concisa, capturando apenas as ideias centrais:
      
      ${chunk}
      `;

    try {
      this.logger.log(`Submiting chunk ${index + 1}...`);
      const result = await this.model.generateContent(prompt);
      const response = result.response;

      if (
        !response.candidates ||
        response.candidates.length === 0 ||
        (response.candidates[0].finishReason !== 'STOP' &&
          response.candidates[0].finishReason !== 'MAX_TOKENS')
      ) {
        this.logger.warn(
          `Chunk ${index + 1} blocked. Reason: ${response.promptFeedback?.blockReason || response.candidates?.[0]?.finishReason}`,
        );
        return '';
      }

      return response.text();
    } catch (error: any) {
      this.logger.error(`Chunk error ${index + 1}: ${error.message}`);
      return '';
    }
  }

  async summarize(text: string): Promise<string> {
    if (!text?.trim()) {
      throw new InternalServerErrorException('Text is required');
    }

    const chunks = this.splitIntoChunks(text);
    this.logger.log(`Text divided in ${chunks.length} chunks`);

    const partialPromises = chunks.map((chunk, i) =>
      this.summarizeChunk(chunk, i),
    );

    this.logger.log(`Summarizing ${chunks.length} chunks in parallel...`);
    const partials = await Promise.all(partialPromises);

    const validPartials = partials.filter((p) => p && p.trim().length > 0);

    if (validPartials.length === 0) {
      this.logger.error('No chunk could be summarized.');
      throw new InternalServerErrorException(
        'Text summarization failed. All chunks failed or were blocked..',
      );
    }

    this.logger.log(`Combining ${validPartials.length} partial abstracts...`);

    if (validPartials.length === 1) {
      return validPartials[0];
    }

    const finalPrompt = `
      Combine os resumos parciais abaixo em um único texto coeso e conciso:
      
      ${validPartials.join('\n\n---\n\n')}
      `;

    try {
      const result = await this.model.generateContent(finalPrompt);
      return result.response.text();
    } catch (error: any) {
      this.logger.error(`Final summarization error: ${error.message}`);
      throw new InternalServerErrorException('Final summarization error');
    }
  }
}