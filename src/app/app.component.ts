import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private cartService:CartService){}
  cart:Cart={items:[]};
  
  ngOnInit(): void {
     this.cartService.cart.subscribe((_cart)=>{
       this.cart=_cart;
     })
  }
}
