import {Component, OnInit, Input, OnChanges, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit,OnChanges {

  @Input() private rating : number = 0;
  @Input() private readOnly : boolean = true;
  @Output() private ratingChange : EventEmitter<number> = new EventEmitter();
  private stars : Array<boolean> = [];
  constructor() {}

  ngOnInit() {}

  ngOnChanges(){
    this.stars = [];
    for(let i = 1; i <= 5; i++){
      this.stars.push(i > this.rating);
    }
  }

  clickStar(index){
    if(!this.readOnly){
      this.rating = index + 1;
      //this.ngOnChanges();
      this.ratingChange.emit(this.rating);
    }
  }
}
