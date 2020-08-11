import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/signUp/signUp.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
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
import { ChangeOrderComponent } from './components/change-order/change-order.component';
import { HistoryComponent } from './components/history/history.component';

const routes: Routes = [
  {path: '', component: ContactComponent},
  {path: 'signUp', component: SignUpComponent},
  {path: 'logIn', component: LogInComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'proyectos', component: ProjectsComponent},
  {path: 'crear-proyecto', component: CreateComponent},
  {path: 'crear-producto', component: CreateProductComponent},
  {path: 'proyecto/:id', component: DetailComponent},
  {path: 'editar-proyecto/:id', component: EditComponent},
  {path: 'info-soda', component: InfoSodaComponent},
  {path: 'cart', component: CarritoComponent},
  {path: 'dashboard', component: DashTestComponent},
  {path: 'editPayments', component: EditPaymentsComponent},
  {path: 'assignRoles', component: RolesComponent},
  {path: 'changeOrder', component: ChangeOrderComponent},
  {path: 'history', component: HistoryComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
