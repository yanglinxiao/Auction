import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import "rxjs/Rx";
import {Http, URLSearchParams} from "@angular/http";

@Injectable()
export class ProductService {

  searchEvent : EventEmitter<ProductSearchParams> = new EventEmitter();

  constructor(private http : Http) {}

  getAllCategories(){
    return ['电子产品','数码手机','图书'];
  }

  getProducts() : Observable<Product[]>{
    return this.http.get('/api/products').map(res => {return res.json()});
  }

  getProductById(productId : number) : Observable<Product>{
    return this.http.get('/api/product/' + productId).map(res => {return res.json()});
  }

  getCommentsByProductId(productId : number) : Observable<Comment[]>{
    return this.http.get('/api/product/' + productId + '/comments').map(res => {return res.json()});
  }

  search(params : ProductSearchParams) : Observable<Product[]>{
    return this.http.get('/api/products',{search:this.encodeParams(params)}).map(res => {return res.json()});
  }

  encodeParams(params : ProductSearchParams){
    return Object.keys(params)
      .filter(key => {return params[key]})
      .reduce((sum:URLSearchParams,key:string) => {
        sum.append(key,params[key]);
        return sum;
      },new URLSearchParams())
  }
}

export class ProductSearchParams{
  constructor(public title : string,
              public price : number,
              public category : string){}
}

export class Product {
  constructor(public id: number,
              public title: string,
              public price: number,
              public rating: number,
              public desc: string,
              public categories: Array<string>) {}
}

export class Comment {
  constructor(public id: number,
              public productId: number,
              public user: string,
              public publishtime: string,
              public rating: number,
              public content: string) {}
}

