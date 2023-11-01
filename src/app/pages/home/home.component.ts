import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styles: [],
})
export class HomeComponent {
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
}

const ROW_HEIGHTS: { [key: number]: number } = { 1: 400, 3: 335, 4: 350 };
