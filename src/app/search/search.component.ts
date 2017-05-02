import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {ProductService} from "../share/product.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private formModel : FormGroup;
  private categories : string[];
  constructor(private productService : ProductService) {
    let formBuilder = new FormBuilder();
    this.formModel = formBuilder.group({
      title : ['',Validators.minLength(3)],
      price : [null,this.positiveNumberValidator],
      category : ['-1']
    })
  }

  ngOnInit() {
    this.categories = this.productService.getAllCategories();
  }

  positiveNumberValidator(formControl : FormControl) : any{
    if(!formControl.value){
      return null;
    }
    let price = parseInt(formControl.value);
    if(price > 0){
      return null;
    }else{
      return {positiveNumber : true};
    }
  }

  OnSearch(){
    if(this.formModel.valid){
      console.log(this.formModel.value);
      this.productService.searchEvent.emit(this.formModel.value);
    }
  }


}
