import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/signUp/signUp.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { InfoSodaComponent } from './components/info-soda/info-soda.component';
import { LogInComponent } from './components/logIn/logIn.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DashTestComponent } from './components/dashTest/dashTest.component';
import { CreateProductComponent } from './components/createProduct/createProduct.component';
import { EditPaymentsComponent } from './components/edit-payments/edit-payments.component';
import { RolesComponent } from './components/roles/roles.component';
import { MantProductsComponent } from './components/mantProducts/mantProducts.component';
import { DetailProductComponent } from './components/detailProduct/detailProduct.component';
import { EditProductComponent } from './components/editProduct/editProduct.component';

const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'proyectos', component: ProjectsComponent},
  {path: 'productos', component: ProductsComponent},
  {path: 'crear-proyecto', component: CreateComponent},
  {path: 'crear-producto', component: CreateProductComponent},
  {path: 'mant-productos', component: MantProductsComponent},
  {path: 'producto/:id', component: DetailProductComponent},
  {path: 'proyecto/:id', component: DetailComponent},
  {path: 'editar-producto/:id', component: EditProductComponent},
  {path: 'editar-proyecto/:id', component: EditComponent},
  {path: 'info-soda', component: InfoSodaComponent},
  {path: 'cart', component: CarritoComponent},
  {path: 'dashboard', component: DashTestComponent},
  {path: 'editPayments', component: EditPaymentsComponent},
  {path: 'assignRoles', component: RolesComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
