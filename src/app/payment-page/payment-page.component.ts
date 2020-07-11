import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
  payementForm: FormGroup ;
  isMasterCard: boolean = false ;
  isVisa: boolean = false ;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.payementForm = this.formBuilder.group ({
      name: ''
    })
    this.payementForm.get('name').valueChanges.subscribe(
      data => {
        console.log('dataa changed', data)
        if(data === '5' ){
          this.isMasterCard = true;
        }else if (data === '4') {
          this.isVisa= true ;
        }else{
          this.isVisa= false ;
          this.isMasterCard = false;
        }
      }
    ),err => {
      console.log(err)
    }
  }

}
export class RadioOverviewExample {

}

