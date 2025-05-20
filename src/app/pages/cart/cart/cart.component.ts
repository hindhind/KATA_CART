import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductUseCase } from 'src/app/core/useCases/product.usecase';
interface DisplayItem {
  id: number;
  name: string;
  quantity: number;
  unitHT: number;
  unitTTC: number;
  tax: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  displayItems$!: Observable<DisplayItem[]>;
  totalTaxes$!: Observable<number>;
  totalTTC$!: Observable<number>;
  constructor(
    private cartService: CartService,
    private productUseCase: ProductUseCase,
    private router: Router
  ) {}

  ngOnInit() {
   this.displayListOfItems();
   this.totalTaxes();
   this.totalTTC();
  }


  displayListOfItems(): void {
    this.displayItems$ = this.cartService.getCartItems().pipe(
      map(items => items.map(i => {
        const unitTTC = this.productUseCase.calculateTTC(
          i.product.price, i.product.category, i.product.isImported
        );
        const tax = +(unitTTC - i.product.price).toFixed(2);
        return {
          id: i.product.id,
          name: i.product.productName,
          quantity: i.quantity,
          unitHT: i.product.price,
          unitTTC,
          tax
        };
      }))
    );
  }
  totalTaxes(): void {
    this.totalTaxes$ = this.displayItems$.pipe(
      map(list => list.reduce((sum, it) => sum + it.tax * it.quantity, 0))
    );
  }

  totalTTC(): void {
    this.totalTTC$ = this.displayItems$.pipe(
      map(list => list.reduce((sum, it) => sum + it.unitTTC * it.quantity, 0))
    );
  }
  
  goToHome(): void{
    this.router.navigate(['']);
  }

  remove(itemId: number): void {
    this.cartService.removeItem(itemId);
  }
}
