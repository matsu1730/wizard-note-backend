import { Request } from '@nestjs/common';

export interface AuthRequest extends Request {
  user: {
    id_usuario: number;
  };
}