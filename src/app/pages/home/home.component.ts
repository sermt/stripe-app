import { Component } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
  constructor(private cartService: CartService) {}
  columns = 3;
  rowHeight = ROW_HEIGHTS[this.columns];
  category: string | undefined;
  onColumnsUpdated(newColNums: number = 0): void {
    this.columns = newColNums;
    this.rowHeight = ROW_HEIGHTS[this.columns];
  }

  onSelectCategory(newCategory: string) {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      productImage: product.image,
      name: product.title,
      quantity: 1,
      price: product.price,
      id: product.id
    });
  }
}

const ROW_HEIGHTS: { [key: number]: number } = { 1: 400, 3: 335, 4: 350 };
