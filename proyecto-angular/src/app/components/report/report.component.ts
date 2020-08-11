import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service'

export interface DialogData {
  order: Order;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [OrderService]
})
export class ReportComponent implements OnInit {
  public problem: string;
  public description: string;
  public order: Order;
  constructor(
    private _orderService: OrderService,
    public dialogRef: MatDialogRef<ReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.order = new Order("","",new Date(),"","",[]);
    }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
  

  onSubmit(form){    
    this.order = this.data.order;
    this.order.problem = this.problem+": "+ this.description;
    this._orderService.updateOrder(this.data.order).subscribe(
      response => {
        alert("Su reporte fue enviado con éxito");
      },
      error => {
        
        console.log(error);
      }

    );
  }

}
