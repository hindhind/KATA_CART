import { categoryEntity } from "./category.entity";

export interface ProductEntity {
 id: number,
 productName: string,
 price: number,
 quantity: number,
 isImported: boolean,
 category: string;
}
