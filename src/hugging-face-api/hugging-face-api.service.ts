import { Injectable } from '@nestjs/common';
import { HUGGING_FACE_API_KEY } from '../config/environment.config';
import { InferenceClient } from '@huggingface/inference';
import type { SummarizationOutput } from '@huggingface/tasks/dist/esm';

@Injectable()
export class HuggingFaceApiService {
  private hfClient: InferenceClient;

  constructor() {
    this.hfClient = new InferenceClient(HUGGING_FACE_API_KEY);
  }

  async getSummarization(inputs: string): Promise<string> {
    const response: SummarizationOutput = await this.hfClient.summarization({
      inputs,
      model: 'google/pegasus-xsum',
    });
    return response.summary_text;
  }
}