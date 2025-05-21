
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BasketComponent } from './basket.component';
import { CartItem, CartService } from 'src/app/core/services/cart.service';
import { ProductEntity } from 'src/app/core/entities/product.entity';

describe('BasketComponent', () => {
  let component: BasketComponent;
  let fixture: ComponentFixture<BasketComponent>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    cartServiceSpy = jasmine.createSpyObj('CartService', ['getCartItems']);

    await TestBed.configureTestingModule({
      declarations: [ BasketComponent ],
      providers: [
        { provide: CartService, useValue: cartServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketComponent);
    component = fixture.componentInstance;
  });

  it('should start with count = 0 before init', () => {
    expect(component.count).toBe(0);
  });

  it('should set quantity in basket to 0 if getCartItems() emits empty array', () => {
    cartServiceSpy.getCartItems.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component.count).toBe(0);
    expect(cartServiceSpy.getCartItems).toHaveBeenCalled();
  });

  it('should sum all quantities when getCartItems() emits non-empty array', () => {
    const items: CartItem[] = [
      { product: { id: 1, productName: "A", price: 10, quantity: 2, isImported: true, category: "Medecine" } as ProductEntity, quantity: 2 },
      { product: { id: 2, productName: "B", price: 20, quantity: 5, isImported: true, category: "Medecine" }  as ProductEntity, quantity: 3 }
    ];

    cartServiceSpy.getCartItems.and.returnValue(of(items));

    fixture.detectChanges(); 

    expect(component.count).toBe(5);
    expect(cartServiceSpy.getCartItems).toHaveBeenCalledTimes(1);
  });

  it('should update quantity in basket if getCartItems() emits again', () => {
    const subject$ = of<CartItem[]>([
      { product: { id: 1, productName: "A", price: 10, quantity: 1, isImported: true, category: "Medecine" } as ProductEntity, quantity: 1 }
    ]);
    cartServiceSpy.getCartItems.and.returnValue(subject$);

    fixture.detectChanges();
    expect(component.count).toBe(1);

    const updated$ = of<CartItem[]>([
      { product: { id: 1, productName: "A", price: 10, quantity: 1, isImported: true, category: "Medecine" } as ProductEntity, quantity: 1 },
      { product: { id: 2, productName: "B", price: 20, quantity: 1, isImported: true, category: "Medecine" } , quantity: 4 }
    ]);
    cartServiceSpy.getCartItems.and.returnValue(updated$);

    component.displyayNumberOfItems();
    fixture.detectChanges();
    expect(component.count).toBe(5);
  });
});
