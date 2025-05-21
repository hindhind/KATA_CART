// cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { CartService, CartItem } from './cart.service';
import { ProductEntity } from '../entities/product.entity';
import { take } from 'rxjs/operators';

describe('CartService', () => {
  let service: CartService;
  let mockProductA: ProductEntity;
  let mockProductB: ProductEntity;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService]
    });
    service = TestBed.inject(CartService);

    mockProductA = { id: 14, productName: "Apple - Fuji", price: 4.37, quantity: 3, isImported: true, category: "Food" } as ProductEntity;
    mockProductB =  { id: 12, productName: "codeine", price: 7.86, quantity: 3, isImported: true, category: "Medecine" } as ProductEntity;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCartItems() émet un tableau vide au démarrage', (done) => {
    service.getCartItems().pipe(take(1)).subscribe(items => {
      expect(items).toEqual([]);
      done();
    });
  });

  it('addItem ajoute un nouvel item', (done) => {
    service.addItem(mockProductA, 2);

    service.getCartItems().pipe(take(1)).subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0]).toEqual({ product: mockProductA, quantity: 2 });
      done();
    });
  });

  it('addItem incrémente la quantité si le produit existe déjà', (done) => {
    service.addItem(mockProductA, 1);
    service.addItem(mockProductA, 3);

    service.getCartItems().pipe(take(1)).subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(4);
      done();
    });
  });

  it('removeItem supprime l’item correspondant', (done) => {
    service.addItem(mockProductA, 1);
    service.addItem(mockProductB, 1);

    service.removeItem(mockProductA.id);

    service.getCartItems().pipe(take(1)).subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe(mockProductB.id);
      done();
    });
  });

  it('clear vide entièrement le panier', (done) => {
    service.addItem(mockProductA, 1);
    service.addItem(mockProductB, 1);

    service.clear();

    service.getCartItems().pipe(take(1)).subscribe(items => {
      expect(items).toEqual([]);
      done();
    });
  });
});
