import { Component, EventEmitter, Output , Inject} from "@angular/core";
import { Observable } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
})
export class FiltersComponent {
  constructor(private storeService: StoreService) {}
  @Output() onCategoryChanged = new EventEmitter<string>();
  categories$:Observable<string[]> = this.storeService.getAllCategories();

  onSelectCategory(category: string) {
    this.onCategoryChanged.emit(category);
  }
}
