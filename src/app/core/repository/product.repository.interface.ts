import {Observable} from 'rxjs';
import { ProductEntity } from '../entities/product.entity';


export interface ProductRepositoryInterface {
    getProducts(): Observable<ProductEntity[]>;
    getProductById(id: number): Observable<ProductEntity>
}
 