import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasketComponent } from './pages/cart/basket/basket.component';
import { productServiceProvider } from './factory/product.service.provider';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpMockRequestInterceptor } from 'src/http-mock-request.interceptor';
import { CommonModule } from '@angular/common';
import { FilterCategoryComponent } from './shared/components/filter-category/filter-category.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ListProjectsComponent } from './pages/product/list-projects/list-projects.component';
import { categoryServiceProvider } from './factory/category.service.provider';
import { AddToCartComponent } from './shared/components/add-to-cart/add-to-cart.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { CartComponent } from './pages/cart/cart/cart.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    BasketComponent,
    ListProjectsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FilterCategoryComponent,
    AddToCartComponent,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpMockRequestInterceptor,
      multi: true,
  },
  {provide: 'BASE_API_URL', useValue: environment.apiUrl},
  productServiceProvider,
  categoryServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
