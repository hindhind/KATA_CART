import { isDevMode } from '@angular/core';
import { ProductService } from '../core/services/product.service';
import { InMemoryProductRepository } from '../infrastructure/in-memory-product.repository';
import { HttpApiProductRepository } from '../infrastructure/http-api-product.repository';
import { environment } from 'src/environments/environment';

const productServiceFactory = (inMemoryApi: any, httpApi: any) => {
    const ApiFactory = isDevMode() && environment.enableMock ? inMemoryApi : httpApi;
    return new ProductService(ApiFactory);
};

export let productServiceProvider = {
    provide: ProductService,
    useFactory: productServiceFactory,
    deps: [InMemoryProductRepository, HttpApiProductRepository]
};
