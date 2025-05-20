import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { categoryEntity } from 'src/app/core/entities/category.entity';
import { ProductEntity } from 'src/app/core/entities/product.entity';
import { CartService } from 'src/app/core/services/cart.service';
import { CategoryUseCase } from 'src/app/core/useCases/category.usecase';
import { ProductUseCase } from 'src/app/core/useCases/product.usecase';

@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss'],
  standalone: false
})
export class ListProjectsComponent implements OnInit, OnDestroy {

  allProducts: ProductEntity[] = [];
  listOfProduct: ProductEntity[] = [];
  productCategories: string[] = [];
  filteredProducts: ProductEntity[] = [];
  addQuantity = false;
  selectedProductId: number | null = null;
  private destroy$ = new Subject<void>();
  totalInCart = 0;  
  constructor (private productUseCase: ProductUseCase, private categoryUseCase: CategoryUseCase, private cartService: CartService, private router: Router ) {

  }

  ngOnInit(): void {
    this.getProductList();
    this.getAllCategories();
  }

  onItemAdded(event: { quantity: number }, product: ProductEntity) {
    this.totalInCart += event.quantity;
    this.cartService.addItem(product, event.quantity);
  }
  getProductList(): void {
    this.productUseCase.getAllProduct().pipe(takeUntil(this.destroy$)).subscribe( {
      next: (products: ProductEntity[]) => {
        this.allProducts = products;
        this.listOfProduct = products.map(p => ({
          ...p,
          price: this.productUseCase.calculateTTC(
            p.price,
            p.category,
            p.isImported
          )
        }));
        this.allProducts = this.listOfProduct;
        
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits', err);
      }
    })
  }

  filterByCategory(category: string) {
    if (category === 'all') {
      this.listOfProduct = [...this.allProducts];
    } else {
      this.listOfProduct = this.allProducts.filter(p => p.category === category);
    }
  }

  getAllCategories(): void {
    this.categoryUseCase.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe( {
      next: (category: categoryEntity[]) => {
        category.map(data => {
          this.productCategories.push( data.categoryName);
        })
      }, error: (err) => {
        console.error('Erreur lors du chargement des categories', err);
      }
     
})
}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  dispalyAddQauntity(productId: number): void{
    this.selectedProductId = this.selectedProductId === productId ? null : productId;
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
