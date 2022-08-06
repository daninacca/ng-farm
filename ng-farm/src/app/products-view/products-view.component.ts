import { Component, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/products.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('300ms ease-out', style({ height: 100, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 100, opacity: 1 }),
            animate('200ms ease-in', style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})
export class ProductsViewComponent implements OnInit {
  products!: Product[];
  showCreateProduct: Boolean = false;

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

  toggleCreateProduct() {
    this.showCreateProduct = !this.showCreateProduct;
  }
}
