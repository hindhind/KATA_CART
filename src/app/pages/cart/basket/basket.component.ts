import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy{
  count = 0;
   private destroy$ = new Subject<void>();
  constructor(private cartService: CartService){}
  
  
  ngOnInit(): void {
    this.displyayNumberOfItems();
  }
  
  displyayNumberOfItems(): void {
  this.cartService.getCartItems().pipe(takeUntil(this.destroy$)).subscribe(items => {
    this.count = items.reduce((sum, i) => sum + i.quantity, 0);
  });
}

ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}
}
