import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OrderService } from 'src/app/services/order/order.service';
import { Article } from 'src/app/services/article/article';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.css']
})
export class MyInvoicesComponent implements OnInit {
  invoiceForm: FormGroup ;
  articles: Article[] = [];
  total:number = 0 ;
  user: any;
  constructor(private router: Router,private orderService: OrderService, 
    private tokenStorageService: TokenStorageService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();
    console.log('user', this.user);
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
        value: this.user.name ,
        disabled: true,
      }],
      hospitalName: [{
        value:this.user.hospital.name ,
        disabled: true,
      }],
      telNumber: [{
        value: this.user.hospital.phoneNumber ,
        disabled: true,
      }],
      id: [{
        value: this.user.id,
        disabled: true,
      }],
      street: [{
        value: this.user.hospital.street , 
        disabled: true,
      }],
      city: [{
        value:this.user.hospital.city ,
        disabled: true,
      }],
      province: [{
        value: this.user.hospital.province ,
        disabled: true,
      }],
      postalCode: [{
        value: this.user.hospital.postalCode,
        disabled: true,
      }],
    })
  }
  
  print(){
    this.user.order.status = 'Payée'
    console.log('----->', this.user);
    this.tokenStorageService.saveUser(this.user)
    window.print();
    this.router.navigate(['/home']);

  }
}
