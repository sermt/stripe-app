import { Component } from "@angular/core";
import { Product } from "src/app/models/product.model";
import { CartService } from "src/app/services/cart.service";
import { StoreService } from "src/app/services/store.service";
import { Observable, tap } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}
  columns = 3;
  rowHeight = ROW_HEIGHTS[this.columns];
  category: string | undefined;
  sort = "desc";
  count = "12";
  products: Observable<Product[]> = this.storeService.getAllProducts(
    this.count,
    this.sort
  );

  onColumnsUpdated(newColNums: number = 0): void {
    this.columns = newColNums;
    this.rowHeight = ROW_HEIGHTS[this.columns];
  }

  onSelectCategory(newCategory: string) {
    this.category = newCategory;

    this.products = this.storeService.getAllProducts(
      this.count,
      this.sort,
      this.category
    );
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      productImage: product.image,
      name: product.title,
      quantity: 1,
      price: product.price,
      id: product.id,
    });
  }

  onItemsCountChanged(newCount: number): void {
    this.count = newCount.toString();
    this.products = this.storeService.getAllProducts(this.count, this.sort);
  }

  onSortChanged(newSort: string): void {
    this.sort = newSort;
    this.products = this.storeService.getAllProducts(this.count, this.sort);
  }
}

const ROW_HEIGHTS: { [key: number]: number } = { 1: 400, 3: 335, 4: 350 };
