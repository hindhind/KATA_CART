import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  standalone: true,
    imports: [CommonModule],
})
export class AddToCartComponent {

@Input() quantity = 1;
@Input()
  productQuantity!: number;

@Output() itemAdded = new EventEmitter<{ quantity: number }>();



onQuantityChange(value: string) {
  const qty = parseInt(value, 10);
  this.quantity = qty > 0 ? qty : 1;
}


addToCart() {
  this.itemAdded.emit({ quantity: this.quantity });
}
}
