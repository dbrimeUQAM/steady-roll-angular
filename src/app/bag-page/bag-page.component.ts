import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Article } from '../services/article/article';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { HeaderService } from '../services/header/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.css']
})
export class BagPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'hospitalName', 'description', 'type', 'next'];
  articles: Article[] = [];
  article: Article;

  invoiceForm: FormGroup ;
  total:number = 0 ;
  user: any;

  payementForm: FormGroup ;
  isMasterCard: boolean = false ;
  isVisa: boolean = false ;
  name: boolean = false;
  number: boolean;
  date: boolean;
  code: boolean;

  articleNum = 0 ;
  public myFrom: FormGroup;
  public count: number ;

  dataSource: MatTableDataSource<Article>;
  receivedChildMessage = 0;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService,
              private headerService: HeaderService,
              private router: Router ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();

    this.orderService.getCurrentOrder(this.tokenStorage.getUser().id)
    .subscribe((res: any) => {
      console.log('my order', res)
      this.articles = res.articles;
      this.dataSource = new MatTableDataSource(this.articles);

    }, err => {
      console.log(err);
    }, () => {
      this.articleNum = this.articles.length ;
      for(let article of this.articles){
        this.total = this.total + (article.qty * article.price)
      }
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

    this.payementForm = this.formBuilder.group ({
      name: ['', Validators.required],
      number: ['', Validators.required],
      code: ['', Validators.required],
      date: ['', Validators.required],
    })
    this.payementForm.get('name').valueChanges.subscribe(
      data => {
        console.log('name', data)
      }
    )
    this.payementForm.get('number').valueChanges.subscribe(
      data => {
        console.log('nuber changed', data)
        if(data.substr(0, 1) === '5' ){
          this.isMasterCard = true;
        }else if (data.substr(0, 1) === '4') {
          this.isVisa= true ;
        }else{
          this.isVisa= false ;
          this.isMasterCard = false;
        }
      }
    )

  }
  clear(){
    this.orderService.deleteAllArticles(this.tokenStorage.getUser().id)
    .subscribe((res: any) => {
      this.headerService.setCartQty(0);
      this.articles = res.articles;
      this.dataSource = new MatTableDataSource(this.articles);
      this.ngOnInit();
    }, err => {
      console.log(err);
    }, () => {
      this.articleNum = this.articles.length ;
    }
    );
  }
  getMessage(message: number) {
    this.receivedChildMessage = message ;
  }

  getTotal(): number{
    let total = 0 ;
    for (const article of this.articles){
      total = total + (article.qty * article.price );
    }
    return total ;
  }
  print(){
    this.user.order.status = 'Payée'
    console.log('----->', this.user);
    this.tokenStorage .saveUser(this.user)
    window.print();
    this.router.navigate(['/home']);

  }
  submit(){
    if(this.payementForm.get('name').invalid){
      console.log('nom non valide')
      this.name = true ;
    }else{
      this.name = false;
    }
    if(this.payementForm.get('number').invalid){
      this.number = true ;
    }
    if(this.payementForm.get('date').invalid){
      this.date = true ;
    }
    if(this.payementForm.get('code').invalid){
      this.code = true ;
    }
  
  }
}
