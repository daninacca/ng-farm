import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIProduct, Product, Stock } from 'src/models/product';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products!: Product[];
  private stocks!: Stock[];

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  setProducts(products: Product[]): void {
    this.products = products;
  }

  setProduct(product: Product): void {
    this.products.push(product);
  }

  setStocks(stocks: Stock[]): void {
    this.stocks = stocks;
  }

  updateProduct(value: Product): void {
    const index = this.products.findIndex(product => product.id === value.id);
    this.products[index] = value;
  }

  getProducts(): Product[] {
    return this.products;
  }

  removeProduct(productId: string) {
    const index = this.products.findIndex(product => product.id === productId);
    this.products.splice(index, 1);
  }

  getStocks(): Stock[] {
    return this.stocks;
  }

  getStock(stockId: number): Stock | undefined {
    return this.stocks?.find(stock => stock.id === stockId);
  }

  fetchProducts(): Observable<APIProduct[]> {
    return this.http.get<APIProduct[]>(
      'https://assessment.farm21.com/api/products',
      this.authenticationService.httpOptions
    );
  }

  fetchStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(
      'https://assessment.farm21.com/api/stocks',
      this.authenticationService.httpOptions
    );
  }

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(
      'https://assessment.farm21.com/api/products',
      product,
      this.authenticationService.httpOptions
    )
  }

  putProduct(productId: string, value: any): Observable<Product> {
    return this.http.put<Product>(
      `https://assessment.farm21.com/api/products/${productId}`,
      value,
      this.authenticationService.httpOptions
    )
  }

  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(
      `https://assessment.farm21.com/api/products/${productId}`,
      this.authenticationService.httpOptions
    )
  }
}
