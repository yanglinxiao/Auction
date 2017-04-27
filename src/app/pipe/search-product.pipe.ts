import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: any, filterField: any,keyword?: any): any {
    if(!filterField || !keyword){
      return products;
    }else{
      return products.filter(product => {
        let filterFieldValue = product[filterField];
        return filterFieldValue.indexOf(keyword) > -1 ;
      })
    }
  }
}
