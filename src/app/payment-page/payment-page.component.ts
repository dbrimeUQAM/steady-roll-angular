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
  payementForm: FormGroup ;
  isMasterCard: boolean = false ;
  isVisa: boolean = false ;
  name: boolean = false;
  number: boolean;
  date: boolean;
  code: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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
  if (this.payementForm.valid){
    this.router.navigate(['/my-invoices']);
    console.log('valid')

  }else{
    console.log('invalid')
  }
}
}
export class RadioOverviewExample {

}

