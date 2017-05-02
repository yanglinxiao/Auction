import { Component, OnInit } from '@angular/core';
import {ProductService, Product} from "../share/product.service";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products : Observable<Product[]>;

  private imgUrl : string = 'http://placehold.it/320x150';
  // private searchInput : FormControl = new FormControl();
  // private keyword : string;
  constructor(private productService : ProductService) { }

  ngOnInit() {
    this.products = this.productService.getProducts();
  //   this.searchInput.valueChanges
  //     .debounceTime(1000)
  //     .subscribe(value => {this.keyword = value;});
    this.productService.searchEvent.subscribe(searchParams => {
      this.products = this.productService.search(searchParams);
    });
   }

}
