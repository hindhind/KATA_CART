import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartComponent } from './add-to-cart.component';

describe('AddToCartComponent', () => {
  let component: AddToCartComponent;
  let fixture: ComponentFixture<AddToCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AddToCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default quantity = 1', () => {
    expect(component.quantity).toBe(1);
  });

  describe('onQuantityChange', () => {
    it('should set quantity to parsed number when positive', () => {
      component.onQuantityChange('5');
      expect(component.quantity).toBe(5);

      component.onQuantityChange('10');
      expect(component.quantity).toBe(10);
    });


  });

  describe('addToCart', () => {
    it('should emit item Added with current quantity', () => {
      spyOn(component.itemAdded, 'emit');
      component.quantity = 3;
      component.addToCart();
      expect(component.itemAdded.emit).toHaveBeenCalledWith({ quantity: 3 });
    });

    it('should emit default quantity if not changed', () => {
      spyOn(component.itemAdded, 'emit');
      component.addToCart();
      expect(component.itemAdded.emit).toHaveBeenCalledWith({ quantity: 1 });
    });
  });
});
