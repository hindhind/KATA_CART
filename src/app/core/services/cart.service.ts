import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductEntity } from '../entities/product.entity';

export interface CartItem {
  product: ProductEntity;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  private items$ = new BehaviorSubject<CartItem[]>([]);
  private readonly STORAGE_KEY = 'cart_items';
  getCartItems() {
    return this.items$.asObservable();
  }


  addItem(product: ProductEntity, quantity: number) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.items$.next(this.items);
    //this.saveAndEmit();
  }

  clear() {
    this.items = [];
    this.items$.next(this.items);
   // this.saveAndEmit();
  }
  removeItem(productId: number) {
    this.items = this.items.filter(i => i.product.id !== productId);
    this.items$.next(this.items);
    //this.saveAndEmit();
  }

  private saveAndEmit() {
    this.items$.next(this.items);
  }
}
