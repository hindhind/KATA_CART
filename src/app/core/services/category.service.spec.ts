
import { CategoryService } from './category.service';
import { InMemoryCategoryRepository } from 'src/app/infrastructure/in-memory-category.repository';
import { categoryEntity } from '../entities/category.entity';

describe('Category service', () => {

    let service: CategoryService;

    beforeEach(() => {
        service = new CategoryService(new InMemoryCategoryRepository());
    });

    it('should get all Categories', () => {
        service.getAllCategory().subscribe((category: categoryEntity[]) => {
           expect(category.length).toEqual(5);
        })
    });


});
