import {Observable} from 'rxjs';
import { categoryEntity } from '../entities/category.entity';


export interface CategoryRepositoryInterface {
    getAllCategory(): Observable<categoryEntity[]>;
}
 