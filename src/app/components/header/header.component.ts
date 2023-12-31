import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styles: [],
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}
  total$: Observable<number> = this.cartService.total$;
  private _cart: Cart = {
    items: [],
  };

  itemsQuantity = 0;
  @Input() get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }

  onClearCart(): void {
    return this.cartService.clearCart();
  }
  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }
}
