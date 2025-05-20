import { Injectable } from '@angular/core';
import { ProductRepositoryInterface } from '../core/repository/product.repository.interface';
import { Observable } from 'rxjs';
import { ProductEntity } from '../core/entities/product.entity';

@Injectable({
  providedIn: 'root',
})
export class HttpApiProductRepository implements ProductRepositoryInterface {

    constructor() {
     
    }
  getProducts(): Observable<ProductEntity[]> {
    throw new Error('Method not implemented.');
  }
  getProductById(id: number): Observable<ProductEntity> {
    throw new Error('Method not implemented.');
  }
}
