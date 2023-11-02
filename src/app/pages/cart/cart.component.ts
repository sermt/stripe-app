import { Component, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  private total = new BehaviorSubject<number>(0);
  total$: Observable<number> = this.total.asObservable();
  cart: Cart = {
    items: [
      {
        productImage: "https://via.placeholder.com/150",
        name: "Fancy shoe",
        price: 100,
        quantity: 1,
        id: 1,
      },
    ],
  };

  dataSource!: CartItem[];
  displayedColumns = [
    "product",
    "name",
    "price",
    "quantity",
    "total",
    "action",
  ];

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    this.total.next(this.getTotal(this.cart.items));
  }

  private getTotal(items: CartItem[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
}
