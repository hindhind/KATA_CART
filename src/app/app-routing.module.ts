import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './pages/product/list-projects/list-projects.component';
import { CartComponent } from './pages/cart/cart/cart.component';

const routes: Routes = [
  { path: '',
    component: ListProjectsComponent,
  },
  { path: 'cart', component: CartComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
