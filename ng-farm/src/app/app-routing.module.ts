import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomComponent } from './hom/hom.component';
import { ProductsViewComponent } from './products-view/products-view.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'products', component: ProductsViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
