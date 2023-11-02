import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, map } from "rxjs";
import { Cart, CartItem } from "../models/cart.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}
  cart = new BehaviorSubject<Cart>({ items: [] });
  total$: Observable<number> = this.cart
    .asObservable()
    .pipe(map(({ items }) => this.getTotal(items)));

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemsInCart = items.find((_item) => _item.id === item.id);
    if (itemsInCart) {
      itemsInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open("Item added to cart", "", { duration: 3000 });
  }

  getTotal(items: CartItem[]): number {
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open("Cart cleared", "", { duration: 3000 });
  }

  removeFromCart(cart: CartItem): void {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== cart.id
    );
    this.cart.next({ items: filteredItems });
    this._snackBar.open("Item removed from cart", "", { duration: 3000 });
  }

  onAddQuantity(cartItem: CartItem): void {
    this.addToCart(cartItem);
  }

  removeQuantity(cartItem: CartItem): void {
    const items = [...this.cart.value.items];
    const itemIndex = items.findIndex((_item) => _item.id === cartItem.id);
    if (items[itemIndex].quantity === 1) {
      items.splice(itemIndex, 1);
    } else {
      items[itemIndex].quantity -= 1;
    }
    this.cart.next({ items });
    this._snackBar.open("Item quantity updated", "", { duration: 3000 });
  }

  checkout(): Observable<any> {
    const url = "http://localhost:4242/checkout";
    return this.http.post(url, { item: this.cart.value.items });
  }
}
