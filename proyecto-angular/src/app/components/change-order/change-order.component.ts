import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order'
@Component({
  selector: 'app-change-order',
  templateUrl: './change-order.component.html',
  styleUrls: ['./change-order.component.css'],
  providers: [OrderService]
})
export class ChangeOrderComponent implements OnInit {
  public orders: Array<Order>;
  public order: Order;
  public add: boolean; 
  public sent: boolean;
  constructor(
    private _orderService: OrderService
  ) { 
    this.order = new Order("","",new Date(),"",[]);
    this.add=false;
    this.sent=false;
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    
    this._orderService.getOrders().subscribe(
      response => {
        
        if (response.orders) {
          console.log("xd");
          this.orders = response.orders;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  updateOrder(newOrder, state){
    newOrder.state = state.srcElement.value;
    console.log(state.srcElement.value);
    this._orderService.updateOrder(newOrder).subscribe(
      response => {
      },
      error => {
        
        console.log(error);
      }

    );
  }
}
