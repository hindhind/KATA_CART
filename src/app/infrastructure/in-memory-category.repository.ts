import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { categoryEntity } from '../core/entities/category.entity';
import { CategoryRepositoryInterface } from '../core/repository/category.repository.interface';
import { MOCK_CATEGORIES } from 'src/assets/mock-data/mock-category';


@Injectable({providedIn: 'root'})
export class InMemoryCategoryRepository implements CategoryRepositoryInterface {
    getAllCategory(): Observable<categoryEntity[]> {
        return of(MOCK_CATEGORIES);
    }
}

