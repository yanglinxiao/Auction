import { Injectable } from '@angular/core';

@Injectable()
export class ProductService {
  private products : Array<Product>;
  private comments : Array<Comment>;
  constructor() {
    this.products = [
      new Product(1,'这是第一个商品',1.99,1.5,'柔光双摄，照亮你的美，OPPO R9S',['电子产品','数码手机']),
      new Product(2,'这是第二个商品',2.99,2.5,'充电五分钟，通话两小时，VIVO X9',['电子产品','数码手机']),
      new Product(3,'这是第三个商品',3.99,3.5,'柔光双摄，照亮你的美，OPPO R9S',['电子产品','数码手机']),
      new Product(4,'这是第四个商品',4.99,4.5,'充电五分钟，通话两小时，VIVO X9',['电子产品','数码手机']),
      new Product(5,'这是第五个商品',5.99,5,'柔光双摄，照亮你的美，OPPO R9S',['电子产品','数码手机']),
      new Product(6,'这是第六个商品',6.99,4,'充电五分钟，通话两小时，VIVO X9',['电子产品','数码手机']),
    ]

    this.comments = [
      new Comment(1,1,'Ivan',new Date().toLocaleTimeString(),3,'这是真是个牛叉的商品'),
      new Comment(2,1,'Ivan',new Date().toLocaleTimeString(),1,'这是真是个牛叉的商品'),
      new Comment(3,2,'Ivan',new Date().toLocaleTimeString(),2,'这是真是个牛叉的商品'),
      new Comment(4,2,'Ivan',new Date().toLocaleTimeString(),4,'这是真是个牛叉的商品'),
      new Comment(5,3,'Ivan',new Date().toLocaleTimeString(),5,'这是真是个牛叉的商品'),
      new Comment(6,3,'Ivan',new Date().toLocaleTimeString(),5,'这是真是个牛叉的商品'),
      new Comment(7,4,'Ivan',new Date().toLocaleTimeString(),2,'这是真是个牛叉的商品'),
      new Comment(8,4,'Ivan',new Date().toLocaleTimeString(),3,'这是真是个牛叉的商品'),
      new Comment(9,5,'Ivan',new Date().toLocaleTimeString(),4,'这是真是个牛叉的商品'),
      new Comment(10,5,'Ivan',new Date().toLocaleTimeString(),5,'这是真是个牛叉的商品'),
      new Comment(11,6,'Ivan',new Date().toLocaleTimeString(),3,'这是真是个牛叉的商品'),
      new Comment(12,6,'Ivan',new Date().toLocaleTimeString(),1,'这是真是个牛叉的商品'),
      new Comment(13,3,'Ivan',new Date().toLocaleTimeString(),1,'这是真是个牛叉的商品'),
      new Comment(14,4,'Ivan',new Date().toLocaleTimeString(),2,'这是真是个牛叉的商品'),
    ]
  }

  getProducts() : Product[]{
    return this.products;
  }

  getProductById(productId : number) : Product{
    return this.products.find(product => product.id == productId);
  }

  getCommentsByProductId(productId : number) : Comment[]{
    return this.comments.filter(comment => comment.productId == productId);
  }
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
