import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProjectsComponent } from './list-projects.component';

import { ProductService } from 'src/app/core/services/product.service';
import { ProductRepositoryInterface } from 'src/app/core/repository/product.repository.interface';
import { InMemoryProductRepository } from 'src/app/infrastructure/in-memory-product.repository';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from 'src/app/app.module';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryRepositoryInterface } from 'src/app/core/repository/category.repository.interface';
import { CategoryUseCase } from 'src/app/core/useCases/category.usecase';
import { InMemoryCategoryRepository } from 'src/app/infrastructure/in-memory-category.repository';
import { ProductUseCase } from 'src/app/core/useCases/product.usecase';
import { of } from 'rxjs';

describe('ListProjectsComponent', () => {
  let component: ListProjectsComponent;
  let fixture: ComponentFixture<ListProjectsComponent>;
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepositoryInterface;
  let categoryUseCase: CategoryUseCase;
  let useCaseProduct: ProductUseCase;
  let serviceProduct: ProductService;
  let productRepository: ProductRepositoryInterface;

  beforeEach(async () => {
    categoryRepository = new InMemoryCategoryRepository();
    categoryService = new CategoryService(categoryRepository);
    categoryUseCase = new CategoryUseCase(categoryService);
    productRepository = new InMemoryProductRepository();
    serviceProduct = new ProductService(productRepository);
    useCaseProduct = new ProductUseCase(serviceProduct);
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppModule,
    ],
      declarations: [ ListProjectsComponent ],
      providers: [
              {
                provide: ProductUseCase,
                useValue: useCaseProduct
              },
              {
                provide: ProductService,
                useValue: serviceProduct
              },
              {
                provide: CategoryService,
                useValue: categoryService
              },
              {
                provide: CategoryUseCase,
                useValue: categoryUseCase
              },
            ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProjectsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should fetch products and map price through calculateTTC', () => {
    fixture.detectChanges();
    expect(useCaseProduct.getAllProduct).toBeDefined;
    expect(component.listOfProduct.length).toBe(19);
    expect(component.listOfProduct[0].price).toBe(1.86);
    expect(component.listOfProduct[1].price).toBe(4.62);
    // allProducts should be same as listOfProduct
    expect(component.allProducts).toEqual(component.listOfProduct);
  });

  it('should fetch categories and populate productCategories', () => {
    fixture.detectChanges();
    expect(categoryUseCase.getAllCategories).toBeDefined;
    expect(component.productCategories.length).toEqual(5);
  });

  it('should show all products when category is all', () => {
    fixture.detectChanges();
    component.filterByCategory('all');
    expect(component.listOfProduct).toEqual(component.allProducts);
  });

  it('should filter products by given category', () => {
    fixture.detectChanges();
    component.filterByCategory('Food');
    expect(component.listOfProduct.length).toEqual(8);
  });
  describe('onItemAdded', () => {
    it('should increment totalInCart by event quantity', () => {
      fixture.detectChanges();
      component.totalInCart = 0;
      component.onItemAdded({ quantity: 3 }, {id: 14, productName: "Apple - Fuji", price: 4.37, quantity: 3, isImported: true, category: "Food" });
      expect(component.totalInCart).toBe(3);
      component.onItemAdded({ quantity: 2 }, {id: 14, productName: "Apple - Fuji", price: 4.37, quantity: 3, isImported: true, category: "Food" });
      expect(component.totalInCart).toBe(5);
    });
  });
});
