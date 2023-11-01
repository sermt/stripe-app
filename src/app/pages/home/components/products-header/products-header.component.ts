import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-products-header",
  templateUrl: "products-header.component.html",
})
export class ProductsHeaderComponent {
  @Output() columnsCountChanged = new EventEmitter<number>();
  sortBy = "desc";
  category: string | undefined = undefined;
  itemsShowCount = 0;
  onSortBy(newSortMethod: string = "desc"): void {
    this.sortBy = newSortMethod;
  }

  onItemsUpdated(count: number = 0): void {
    this.itemsShowCount = count;
  }
  onColumnsUpdated(colsNum: number = 0): void {
    this.columnsCountChanged.emit(colsNum);
  }
}
