import { BrowserModule } from '@angular/platform-browser';
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
import { CreateComponent } from './components/create/create.component';
import { ErrorComponent } from './components/error/error.component';
import { DetailComponent } from './components/detail/detail.component';
import { EditComponent } from './components/edit/edit.component';
import { InfoSodaComponent } from './components/info-soda/info-soda.component';
import { CarritoComponent } from './components/carrito/carrito.component'


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    SignUpComponent,
    LogInComponent,
    ContactComponent,
    SafePipe,
    ProjectsComponent,
    CreateComponent,
    ErrorComponent,
    DetailComponent,
    EditComponent,
    InfoSodaComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollingModule
  ],
  providers: [appRoutingProviders, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
