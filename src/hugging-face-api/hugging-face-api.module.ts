import { Module } from '@nestjs/common';
import { HuggingFaceApiService } from './hugging-face-api.service';

@Module({
  providers: [HuggingFaceApiService],
  exports: [HuggingFaceApiService]
})
export class HuggingFaceApiModule {}