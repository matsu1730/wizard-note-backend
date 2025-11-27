export class SummarizationDto {
  prompt: string;
}

export class SummarizationResultDto {
  summary: string;

  constructor(summary: string) {
    this.summary = summary;
  }
}