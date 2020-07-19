import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { TokenStorageService } from 'src/app/services/token-storage/token-storage.service';
import { Order } from 'src/app/services/order/order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article } from 'src/app/services/article/article';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  invoiceForm: FormGroup ;
  panelOpenState = false;
  orders: Order[]=[]
  articles: Article[]=[]
  user: any;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor( private articleService: ArticleService, private orderService: OrderService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });


    this.user = this.tokenStorage.getUser() ;
    console.log(this.user)
    this.orderService.getAll()
    .subscribe((res: any) => {
      
      this.orders= res
      console.log('my orders', this.orders);

     }, err => {
      console.log(err);
    },/*  ()=> {
      for (let item of order.articles){
        this.articleService.getArticleById(item.articleId).subscribe((data: any) => {
          this.articles.push(data)
         
        }, err => {
          console.log(err);
        });
      }
      console.log(' this.articles',this.articles)
    } */
    );
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

}
