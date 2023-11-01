import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent {
  @Output() onCategoryChanged = new EventEmitter<string>();
  categories = ["shoes", "clothes", "accessories"];

  onSelectCategory(category: string) {
    this.onCategoryChanged.emit(category);
  }
}
