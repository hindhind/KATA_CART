import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
