import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { Article } from 'src/app/services/article/article';

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.css']
})
export class MyInvoicesComponent implements OnInit {
  invoiceForm: FormGroup ;
  articles: Article[] = [];
  total:number = 0 ;
  constructor(private orderService: OrderService, private tokenStorageService: TokenStorageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const user = this.tokenStorageService.getUser();
    console.log('user', user);
    this.orderService.getCurrentOrder(this.tokenStorageService.getUser().id)
    .subscribe((res: any) => {
      console.log('my order', res)
      this.articles = res.articles;
    }, err => {
      console.log(err);
    }, () => {
      for(let article of this.articles){
        this.total = this.total + (article.qty * article.price)
      }
      //this.articleNum = this.articles.length ;
    });
    this.invoiceForm = this.formBuilder.group ({
      name: [{
        value: user.name ,
        disabled: true,
      }],
      hospitalName: [{
        value:user.hospital.name ,
        disabled: true,
      }],
      telNumber: [{
        value: user.hospital.phoneNumber ,
        disabled: true,
      }],
      id: [{
        value: user.id,
        disabled: true,
      }],
      street: [{
        value: user.hospital.address.street , 
        disabled: true,
      }],
      city: [{
        value:user.hospital.address.city ,
        disabled: true,
      }],
      province: [{
        value: user.hospital.address.province ,
        disabled: true,
      }],
      postalCode: [{
        value: user.hospital.address.postalCode,
        disabled: true,
      }],
    })
  }
  
  print(){
    window.print();
  }
}
