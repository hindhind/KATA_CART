import { Observable } from 'rxjs';
import { CategoryRepositoryInterface } from '../repository/category.repository.interface';
import { categoryEntity } from '../entities/category.entity';



export class CategoryService {
    constructor(
        private categoryRepository: CategoryRepositoryInterface
    ) {}

    getAllCategory(): Observable<categoryEntity[]>{
        return this.categoryRepository.getAllCategory();
    }

}
