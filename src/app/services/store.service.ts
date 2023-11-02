import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  private BASE_URL = "https://fakestoreapi.com";
  constructor(private http: HttpClient) {}

  getAllProducts(
    limit = "12",
    sort = "desc",
    category?: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.BASE_URL}/products${
        category ? "/category/" + category : ""
      }?limit=${limit}&sort=${sort}`
    );
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.BASE_URL}/products/categories`);
  }
  
 
}
