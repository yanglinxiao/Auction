import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StarsComponent } from './stars/stars.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes} from "@angular/router";
import {ProductService} from "./share/product.service";
import { SearchProductPipe } from './pipe/search-product.pipe';
import {WebSocketService} from "./share/web-socket.service";

const RouteConfig : Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'product/:productId',
    component : ProductDetailComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StarsComponent,
    FooterComponent,
    CarouselComponent,
    SearchComponent,
    NavbarComponent,
    ProductComponent,
    ProductDetailComponent,
    HomeComponent,
    SearchProductPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(RouteConfig),
    ReactiveFormsModule
  ],
  providers: [ProductService,WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
