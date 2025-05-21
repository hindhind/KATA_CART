import { categoryEntity } from "./category.entity";

export interface Items {
  id: number;
  name: string;
  quantity: number;
  unitHT: number;
  unitTTC: number;
  tax: number;
}
