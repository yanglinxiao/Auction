import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService, Product, Comment} from "../share/product.service";
import {WebSocketService} from "../share/web-socket.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private product : Product;
  private comments : Comment[];
  private imgUrl : string = 'http://placehold.it/800x320';
  private isWatched : boolean = false;
  private currentPrice : number;
  private subscription : Subscription;
  private newComment : string = '';
  private newRating : number = 5;
  private isComment : boolean = false;
  constructor(private routeInfo : ActivatedRoute,
              private productService : ProductService,
              private webSocket : WebSocketService) {}

  ngOnInit() {
    let productId : number = this.routeInfo.snapshot.params['productId'];
    this.productService.getProductById(productId).subscribe(product => {
      this.product = product;
      this.currentPrice = product.price;
    });
    this.productService.getCommentsByProductId(productId).subscribe(comments => {
      this.comments = comments;
    });
  }

  watchProduct(){
    if(this.subscription){
      this.subscription.unsubscribe();
      this.isWatched = false;
      this.subscription = null;
    }else{
      this.isWatched = true;
      this.subscription = this.webSocket.createObservableSocket('ws://localhost:8085',this.product.id).subscribe(
        productsPriceInfo => {
          let productPriceInfo = productsPriceInfo.find(productPriceInfo => productPriceInfo.productId == this.product.id);
          this.currentPrice = productPriceInfo.currentPrice;
          console.log(productPriceInfo);
        }
      )
    }

  }

  addComment(){
    if(this.newComment.length > 0){
      this.isComment = false;
      let comment = new Comment(0,this.product.id,'Ivan',new Date().toLocaleTimeString(),this.newRating,this.newComment);
      this.comments.unshift(comment);
      let totalRating = this.comments.reduce((sum,comment) => sum += comment.rating,0);
      this.product.rating = totalRating / this.comments.length;
      this.newComment = null;
      this.newRating = 5;
    }else{
      window.alert('输入内容啦扑街');
    }
  }
}
