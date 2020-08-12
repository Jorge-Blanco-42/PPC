import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CookieService } from 'ngx-cookie-service';
import {SafePipe} from './pipes/Safe.pipe';

import { AppRoutingModule ,appRoutingProviders} from './app-routing.module';
import { AppComponent} from './app.component';
import { AboutComponent } from './components/about/about.component';
import { SignUpComponent } from './components/signUp/signUp.component';
import { LogInComponent } from './components/logIn/logIn.component';
import { ContactComponent} from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { MantProductsComponent } from './components/mantProducts/mantProducts.component';
import { DetailProductComponent } from './components/detailProduct/detailProduct.component';
import { EditProductComponent } from './components/editProduct/editProduct.component';
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { InfoSodaComponent } from './components/info-soda/info-soda.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DashTestComponent } from './components/dashTest/dashTest.component';
import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/createProduct/createProduct.component';
import { EditPaymentsComponent } from './components/edit-payments/edit-payments.component';
import { RolesComponent } from './components/roles/roles.component';
import { ChangeOrderComponent } from './components/change-order/change-order.component';
import { HistoryComponent } from './components/history/history.component';
import { ReportComponent } from './components/report/report.component';
import {MatNativeDateModule} from '@angular/material/core';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import { UserFacadeComponent } from './components/user-facade/user-facade.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SignUpComponent,
    LogInComponent,
    ContactComponent,
    SafePipe,
    ProjectsComponent,
    MantProductsComponent,
    DetailProductComponent,
    EditProductComponent,
    CreateComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent,
    InfoSodaComponent,
    CarritoComponent,
    DashTestComponent,
    ProductsComponent,
    CreateProductComponent,
    EditPaymentsComponent,
    RolesComponent,
    ChangeOrderComponent,
    HistoryComponent,
    ReportComponent,
    UserFacadeComponent,
    DetailUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatNativeDateModule
  ],
  providers: [appRoutingProviders, CookieService, {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}],
  bootstrap: [AppComponent],
  entryComponents: [
    ReportComponent,
    UserFacadeComponent
  ],
})
export class AppModule { }
