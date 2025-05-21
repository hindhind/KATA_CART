import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  count = 0;
  constructor(private cartService: CartService){}
  
  ngOnInit(): void {
    this.displyayNumberOfItems();
  }
  
  displyayNumberOfItems(): void {
  this.cartService.getCartItems().subscribe(items => {
    this.count = items.reduce((sum, i) => sum + i.quantity, 0);
  });
}
}
