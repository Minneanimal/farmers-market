import { User } from 'src/app/services/auth.service';
import { Product } from './product.dto';

export interface KitchenDto {
  id: number;
  name: string;
  products: Product[];
  owner: User;
}
