import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  products!: Product[];

  constructor(
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.fetchProducts().subscribe(
      products => {
        // The products coming from the API have comma's and decimals
        // Make sure we end up with floats while keeping the decimals
        const mappedProducts = products.map(product =>
          ({
            ...product,
            price: parseFloat(product.price.replace(/,/, '.'))
        }));
        this.products = mappedProducts;
        this.productsService.setProducts(mappedProducts)
      }
    );
  }
}
