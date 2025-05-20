import { isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryService } from '../core/services/category.service';
import { InMemoryCategoryRepository } from '../infrastructure/in-memory-category.repository';
import { HttpApiCategoryRepository } from '../infrastructure/http-api-category.repository';

const categoryServiceFactory = (inMemoryApi: any, httpApi: any) => {
    const ApiFactory = isDevMode() && environment.enableMock ? inMemoryApi : httpApi;
    return new CategoryService(ApiFactory);
};

export let categoryServiceProvider = {
    provide: CategoryService,
    useFactory: categoryServiceFactory,
    deps: [InMemoryCategoryRepository, HttpApiCategoryRepository]
};
