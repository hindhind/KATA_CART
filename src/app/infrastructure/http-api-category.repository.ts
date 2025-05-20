import { Injectable } from '@angular/core';
import { ProductRepositoryInterface } from '../core/repository/product.repository.interface';
import { Observable } from 'rxjs';
import { ProductEntity } from '../core/entities/product.entity';
import { CategoryRepositoryInterface } from '../core/repository/category.repository.interface';
import { categoryEntity } from '../core/entities/category.entity';

@Injectable({
  providedIn: 'root',
})
export class HttpApiCategoryRepository implements CategoryRepositoryInterface {

    constructor() {
     
    }
  getAllCategory(): Observable<categoryEntity[]> {
    throw new Error('Method not implemented.');
  }
}
