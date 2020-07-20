import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  paymentForm: FormGroup ;
  isMasterCard: boolean = false ;
  isVisa: boolean = false ;
  name: boolean = false;
  number: boolean;
  date: boolean;
  code: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group ({
      name: ['', Validators.required],
      number: ['', Validators.required],
      code: ['', Validators.required],
      date: ['', Validators.required],
    })
    this.paymentForm.get('name').valueChanges.subscribe(
      data => {
        console.log('name', data)
      }
    )
    this.paymentForm.get('number').valueChanges.subscribe(
      data => {
        console.log('nuber changed', data)
        if(data.substr(0, 1) === '5' ){
          console.log('ici master')
          this.isMasterCard = true;
        }else if (data.substr(0, 1) === '4') {
          console.log('ici visa')
          this.isVisa= true ;
        }else{
          this.isVisa= false ;
          this.isMasterCard = false;
        }
      }
    )
  }
submit(){
  if(this.paymentForm.get('name').invalid){
    console.log('nom non valide')
    this.name = true ;
  }else{
    this.name = false;
  }
  if(this.paymentForm.get('number').invalid){
    this.number = true ;
  }
  if(this.paymentForm.get('date').invalid){
    this.date = true ;
  }
  if(this.paymentForm.get('code').invalid){
    this.code = true ;
  }
  if (this.paymentForm.valid){
    this.router.navigate(['/my-invoices']);
    console.log('valid');

  }else{
    console.log('invalid');
  }
}

placeOrder() {
  console.log('place order');
}

}
export class RadioOverviewExample {

}

