import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { Order } from '../services/order/order';
import { InvoiceService } from '../services/invoice/invoice.service';
import { Invoice } from '../services/invoice/invoice';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { HeaderService } from '../services/header/header.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };

  paymentForm: FormGroup ;
  isMasterCard = false ;
  isVisa = false ;
  name = false;
  number: boolean;
  date: boolean;
  code: boolean;

  order: Order;

  TPS = 0.05;
  TVQ = 0.09975;
  DeliveryCharges = 15;

  isLoaded = false;
  hospital;
  user;

  invoice: Invoice;


  constructor(private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private router: Router,
              private orderService: OrderService,
              private headerService: HeaderService,
              private invoiceService: InvoiceService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {

    this.invoice = new Invoice();

    this.user = this.tokenStorage.getUser();
    this.hospital = this.user.hospital;

    this.orderService.getCurrentOrder(this.user.id)
      .subscribe((res: any) => {
        this.order = res;

        this.invoice.name = this.user.name;
        this.invoice.hospitalId = this.hospital._id;
        this.invoice.invoiceDate = new Date().toISOString();
        this.invoice.orderId = this.order._id;
        this.invoice.userId = this.user.id;

        this.isLoaded = true;
      }, err => {
        console.log(err);
      });

    this.paymentForm = this.formBuilder.group ({
      name: [this.user.name, Validators.required],
      number: ['', Validators.required],
      code: ['', Validators.required],
      date: ['', Validators.required],
    });

    this.paymentForm.get('name').valueChanges.subscribe(
      data => {
        this.invoice.name = data;
      }
    );
    this.paymentForm.get('number').valueChanges.subscribe(
      data => {
        this.invoice.number = data;
        if (data.substr(0, 1) === '5' ){
          this.isMasterCard = true;
        }else if (data.substr(0, 1) === '4') {
          this.isVisa = true ;
        }else{
          this.isVisa = false ;
          this.isMasterCard = false;
        }
      }
    );
    this.paymentForm.get('code').valueChanges.subscribe(
      data => {
        this.invoice.code = data;
      }
    );
    this.paymentForm.get('date').valueChanges.subscribe(
      data => {
        this.invoice.date = data;
      }
    );
  }

  placeOrder() {
    if (this.paymentForm.get('name').invalid) {
      this.name = true;
    }
    if (this.paymentForm.get('code').invalid) {
      this.code = true;
    }
    if (this.paymentForm.get('number').invalid) {
      this.number = true;
    }
    if (this.paymentForm.get('date').invalid) {
      this.date = true;
    }

    if (this.paymentForm.valid) {
      this.invoiceService.addInvoice(this.invoice).subscribe(data => {
        this.headerService.setCartQty(0);
        this.openSnackBarSuccess('Commande reçu!');
        // this.ngOnInit();
        // this.router.navigate([`/invoice-detail/${data._id}`]);
      }, err => {
        console.log(err);
      });
    }
  }

  getSubTotal() {
    return this.order.articles.map(a => a.price * a.qty).reduce((acc, value) => acc + value, 0);
  }

  getTPS() {
    return (this.getSubTotal() * this.TPS) + (this.DeliveryCharges * this.TPS);
  }

  getTVQ() {
    return (this.getSubTotal() * this.TVQ) + (this.DeliveryCharges * this.TVQ);
  }

  getTotal() {
    return this.getSubTotal() + this.getTPS() + this.getTVQ() + this.DeliveryCharges;
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }



}
export class RadioOverviewExample {

}

