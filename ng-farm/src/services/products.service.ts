import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIProduct, Product } from 'src/models/product';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products!: Product[];

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  fetchProducts(): Observable<APIProduct[]> {
    return this.http.get<APIProduct[]>(
      'https://assessment.farm21.com/api/products',
      this.authenticationService.httpOptions
    );
  }

  setProducts(products: Product[]): void {
    this.products = products;
  }

  getProducts(): Product[] {
    return this.products;
  }
}
