import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../services/article/article';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { OrderService } from '../services/order/order.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-line-input',
  templateUrl: './line-input.component.html',
  styleUrls: ['./line-input.component.css']
})
export class LineInputComponent implements OnInit {
  sousTotal: number = 0;
  @Input() public line: Article ;

  @Output() messageToEmit = new EventEmitter<number>();
  public myFrom: FormGroup;
  messageToSendC: number ;


  constructor(private formBuilder: FormBuilder,private orderService:OrderService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log('======>', this.line)
    this.myFrom = this.formBuilder.group ({
      quantity: [{ value: this.line.qty, disabled: false}] ,
      price: [{ value: this.line.price ? this.line.price : 0 , disabled: true}],
      total: [{ value: this.line.price * this.line.qty , disabled: true}]
    }) ;


    this.myFrom.get('quantity').valueChanges.subscribe(
      data => {
        if(data > this.line.quantity){
          this.myFrom.get('quantity').setValue(this.line.quantity);
        }
        this.myFrom.get('total').setValue(data * this.line.price);
        //update DB
        this.orderService.updateArticleById(this.tokenStorage.getUser().id, this.line._id , data).subscribe(data =>{
          this.line = data ;
          window.location.reload();
        }) ;

        this.messageToSendC = this.myFrom.get('total').value
        this.sendMessageToParent(this.messageToSendC)
      }
    )
  }

  removeArticle(articleId: string){
    this.orderService.deleteArticle(this.tokenStorage.getUser().id, articleId).subscribe(data => {
      this.line = null ;
      window.location.reload();
      }, err =>{
        console.log(err);
      }
    )
  }

  getTotal(){
    return this.messageToSendC
  }
  sendMessageToParent(message: number) {
    this.messageToEmit.emit(message)
  }

}
