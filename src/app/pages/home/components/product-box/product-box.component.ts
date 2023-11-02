import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-product-box",
  templateUrl: "./product-box.component.html",
  styles: [],
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Output() addToCart = new EventEmitter<Product>();
  product: Product | undefined = {
    id: 0,
    title: "something",
    category: "something",
    description: "something",
    image: "https://via.placeholder.com/150",
    price: 10,
  };

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
