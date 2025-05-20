import { InMemoryProductRepository } from 'src/app/infrastructure/in-memory-product.repository';
import { ProductService } from './product.service';
import { ProductEntity } from '../entities/product.entity';

describe('Product service', () => {

    let service: ProductService;

    beforeEach(() => {
        service = new ProductService(new InMemoryProductRepository());
    });

    it('should get all product', () => {
        service.getListOfProduct().subscribe((products: ProductEntity[]) => {
            console.log('test')
            expect(products.length).toEqual(19);
            expect(products[0].id).toEqual(1);
            expect(products[0].productName).toEqual('');
            expect(products[0].category).toEqual('Food');
        });
    });

    it('should get product by id', () => {
        service.getProductById(1).subscribe((products: ProductEntity) => {
            console.log('test')
            expect(products.id).toEqual(14);
            expect(products.productName).toEqual('Apple - Fuji');
            expect(products.category).toEqual('Food');
        });
    });
});
