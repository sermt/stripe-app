import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "products-header.component.html",
})
export class ProductsHeaderComponent {
  @Output() columnsCountChanged = new EventEmitter<number>();
  @Output() itemsCountChanged = new EventEmitter<number>();
  @Output() sortChanged = new EventEmitter<string>();
  sortBy = "desc";
  category: string | undefined = undefined;
  itemsShowCount = 12;
  onSortBy(newSortMethod: string = "desc"): void {
    this.sortBy = newSortMethod;
    this.sortChanged.emit(newSortMethod);
  }

  onItemsUpdated(count: number = 0): void {
    this.itemsShowCount = count;
    this.itemsCountChanged.emit(count);
  }
  onColumnsUpdated(colsNum: number = 0): void {
    this.columnsCountChanged.emit(colsNum);
  }
}
