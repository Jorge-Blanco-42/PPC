import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { InfoSodaComponent } from './components/info-soda/info-soda.component';
import { CartComponent } from './components/cart/cart.component';

const routes: Routes = [
  {path: '', component: AboutComponent},
  {path: 'sobre-mi', component: AboutComponent},
  {path: 'contacto', component: ContactComponent},
  {path: 'proyectos', component: ProjectsComponent},
  {path: 'crear-proyecto', component: CreateComponent},
  {path: 'proyecto/:id', component: DetailComponent},
  {path: 'editar-proyecto/:id', component: EditComponent},
  {path: 'info-soda', component: InfoSodaComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const appRoutingProviders: any[] = [];
