import {Injectable} from '@angular/core';
import { ProductRepositoryInterface } from '../core/repository/product.repository.interface';
import { Observable, of } from 'rxjs';
import { ProductEntity } from '../core/entities/product.entity';
import { MOCK_PRODUCTS } from '../../assets/mock-data/mock-product';


@Injectable({providedIn: 'root'})
export class InMemoryProductRepository implements ProductRepositoryInterface {
    getProducts(): Observable<ProductEntity[]> {
        return of(MOCK_PRODUCTS);
    }
    getProductById(id: number): Observable<ProductEntity> {
        return of(MOCK_PRODUCTS[1]);
    }
}

