import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { ProductEntity } from '../entities/product.entity';
import { ProductUseCase } from './product.usecase';


describe('ProductUseCase', () => {
  let useCase: ProductUseCase;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductService', ['getListOfProduct']);

    TestBed.configureTestingModule({
      providers: [
        ProductUseCase,
        { provide: ProductService, useValue: spy }
      ]
    });

    useCase = TestBed.inject(ProductUseCase);
    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  describe('getAllProduct', () => {
    it('should call ProductService.getListOfProduct and return products', (done: DoneFn) => {
      const mockProducts: ProductEntity[] = [
        { id: 1, productName: 'Test', price: 10, quantity: 1, isImported: false, category: 'Food' }
      ];
      productServiceSpy.getListOfProduct.and.returnValue(of(mockProducts));

      useCase.getAllProduct().subscribe(products => {
        expect(products).toEqual(mockProducts);
        expect(productServiceSpy.getListOfProduct).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('roundTax', () => {
    it('should round up to nearest 0.05', () => {
      expect(useCase.roundTax(0.99)).toBe(1.00);
      expect(useCase.roundTax(1.00)).toBe(1.00);
      expect(useCase.roundTax(1.01)).toBe(1.05);
      expect(useCase.roundTax(1.02)).toBe(1.05);
      expect(useCase.roundTax(1.05)).toBe(1.05);
      expect(useCase.roundTax(1.06)).toBe(1.10);
    
    });
  });

  describe('calculateTTC', () => {
    it('should apply no tax for Food and Medecine', () => {
      expect(useCase.calculateTTC(10.00, 'Food', false)).toBe(10.00);
      expect(useCase.calculateTTC(10.00, 'Medecine', true)).toBe(10.50);
    });

    it('should apply 10% VAT for Books', () => {
      expect(useCase.calculateTTC(20.00, 'Books', false)).toBe(22.00);
    });

    it('should apply 20% VAT for other categories', () => {
      expect(useCase.calculateTTC(50.00, 'Electric', false)).toBe(60.00);
    });

    it('should apply import tax of 5% for imported items', () => {
      expect(useCase.calculateTTC(30.00, 'Food', true)).toBe(31.50);
    });

    it('should combine VAT and import tax', () => {
      expect(useCase.calculateTTC(100.00, 'Books', true)).toBe(115.00);
    });

    it('should round each tax separately to 0.05 increments', () => {
      expect(useCase.calculateTTC(47.23, 'Electric', true)).toBe(59.08);
    });
  });
});
