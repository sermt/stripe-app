import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Observable, Subject, tap } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit, AfterViewInit {
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  private total = new Subject<number>();
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
  }
  ngAfterViewInit(): void {
    this.total.next(this.getTotal(this.cart.items));
    this.changeDetectorRef.detectChanges();
  }

  getTotal(items: CartItem[]): number {
    let total = 0;
    items.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
}
