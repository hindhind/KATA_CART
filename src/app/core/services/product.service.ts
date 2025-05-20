import { Observable } from 'rxjs';
import { ProductRepositoryInterface } from '../repository/product.repository.interface';
import { ProductEntity } from '../entities/product.entity';



export class ProductService {
    constructor(
        private productRepository: ProductRepositoryInterface
    ) {}

    getListOfProduct(): Observable<ProductEntity[]> {
        return this.productRepository.getProducts();
    }

    getProductById(productId: number): Observable<ProductEntity> {
        return this.productRepository.getProductById(productId);
    }
}
