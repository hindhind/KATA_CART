import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartItem, CartService } from 'src/app/core/services/cart.service';
import { ProductUseCase } from 'src/app/core/useCases/product.usecase';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let productUseCaseSpy: jasmine.SpyObj<ProductUseCase>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    const cartSpy = jasmine.createSpyObj('CartService', ['getCartItems']);
    const useCaseSpy = jasmine.createSpyObj('ProductUseCase', ['calculateTTC']);
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [MatIconModule],
      providers: [
        { provide: CartService, useValue: cartSpy },
        { provide: ProductUseCase, useValue: useCaseSpy },
        { provide: Router, useValue: rSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    productUseCaseSpy = TestBed.inject(ProductUseCase) as jasmine.SpyObj<ProductUseCase>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize displayItems$, totalTaxes$, totalTTC$', (done: DoneFn) => {
    const mockProducts = [
      { id: 1, productName: 'Prod1', price: 10, quantity: 5, isImported: false, category: 'Books' },
      { id: 2, productName: 'Prod2', price: 20, quantity: 2, isImported: true, category: 'Other' }
    ];
    const mockCartItems: CartItem[] = [
      { product: mockProducts[0], quantity: 2 },
      { product: mockProducts[1], quantity: 3 }
    ];
    cartServiceSpy.getCartItems.and.returnValue(of(mockCartItems));
    productUseCaseSpy.calculateTTC.withArgs(10, 'Books', false).and.returnValue(12);
    productUseCaseSpy.calculateTTC.withArgs(20, 'Other', true).and.returnValue(25);

 
    fixture.detectChanges();

  
    component.displayItems$.subscribe(items => {
      expect(items.length).toBe(2);
      expect(items[0]).toEqual({
        id: 1,
        name: 'Prod1',
        quantity: 2,
        unitHT: 10,
        unitTTC: 12,
        tax: 2
      });
      expect(items[1]).toEqual({
        id: 2,
        name: 'Prod2',
        quantity: 3,
        unitHT: 20,
        unitTTC: 25,
        tax: 5
      });
      done();
    });
  });
  it('should calculate totalTaxes$ and totalTTC$ correctly', (done: DoneFn) => {
    const displayItems = [
      { name: 'A', quantity: 2, unitHT: 10, unitTTC: 12, tax: 2 },
      { name: 'B', quantity: 3, unitHT: 20, unitTTC: 25, tax: 5 }
    ];
    
    component.displayItems$ = of(displayItems as any);
    component.totalTaxes();
    component.totalTTC();

    component.totalTaxes$.subscribe(totalTax => {
      // 2*2 + 3*5 = 4 + 15 = 19
      expect(totalTax).toBe(19);
    });

    component.totalTTC$.subscribe(total => {
      // 2*12 + 3*25 = 24 + 75 = 99
      expect(total).toBe(99);
      done();
    });
  });
});
