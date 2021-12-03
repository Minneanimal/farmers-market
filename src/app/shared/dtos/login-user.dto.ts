import { User } from 'src/app/services/auth.service';

export interface LoginUserDto {
  user: User;
  access_token: string;
  expiresIn: number;
}
