import { Component, OnInit } from '@angular/core';
import { PaymentMethodService } from '../../services/paymentMethod.service';
import { Global } from 'src/app/services/global';
import { PaymentMethod } from '../../models/paymentMethod';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-edit-payments',
  templateUrl: './edit-payments.component.html',
  styleUrls: ['./edit-payments.component.css'],
  providers: [PaymentMethodService]
})
export class EditPaymentsComponent implements OnInit {
  public payments: Array<PaymentMethod>;
  public payment: PaymentMethod;
  public add: boolean; 
  public sent: boolean;
  public active: boolean;
  constructor(
    private _paymentMethodService: PaymentMethodService,
  ) {
    this.payment = new PaymentMethod("", false);
    this.add=false;
    this.sent=false;
   }

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(){
    this._paymentMethodService.getPayments().subscribe(
      response => {
        if (response.payments) {
          this.payments = response.payments;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addPay(){
    this.add = true;
    this.payment = new PaymentMethod("",true);
  }

  updatePay(newPayment, newState){
    newPayment.state = newState;
    this._paymentMethodService.updatePayment(newPayment).subscribe(
      response => {
        this.getPayments();
      },
      error => {
        
        console.log(error);
      }

    );
  }
  deletePay(payment){
    this._paymentMethodService.deletePayment(payment._id).subscribe(
      response => {
        console.log("Delete");
        this.getPayments();
      },
        err =>{
          console.log(err);
        }
    );
  }
  
  onSubmit(form){
    this._paymentMethodService.savePayment(this.payment).subscribe(
      response =>{        
        console.log(response);
        this.sent=true;
        this.getPayments();
        this.add = false;
      },
      error => {
        console.log(error);
      }

    );
  }

}
