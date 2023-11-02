import { Component, OnInit } from "@angular/core";
import { loadStripe } from "@stripe/stripe-js";
import { Observable } from "rxjs";
import { Cart, CartItem } from "src/app/models/cart.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}
  total$: Observable<number> = this.cartService.total$;
  cart: Cart = {
    items: [],
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
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
    this.dataSource = this.cart.items;
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }

  onAddQuantity(cartItem: CartItem): void {
    this.cartService.addToCart(cartItem);
  }

  onRemoveQuantity(cartItem: CartItem): void {
    this.cartService.removeQuantity(cartItem);
  }

  onCheckout(): void {
    this.cartService.checkout().subscribe(() => {
      async(res:any)=>{
        let stripe = await loadStripe('token here');
        stripe?.redirectToCheckout({sessionId:res.id})
      }
    });
  }
}
