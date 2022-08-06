import { Component, Input, OnInit } from '@angular/core';
import { Product, Stock } from 'src/models/product';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
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
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  stock!: Stock | undefined;
  showEditProduct: Boolean = false;

  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productService.fetchStocks()
      .subscribe(stocks => {
        this.productService.setStocks(stocks)
        this.stock = this.productService.getStock(this.product.stock_id);
      });
  }

  toggleEditProduct() {
    this.showEditProduct = !this.showEditProduct;
  }

  deleteProduct() {
    if (this.product.id)
      this.productService.deleteProduct(this.product.id)
        .subscribe(() => {
          if (this.product.id) // lol twice?
            this.productService.removeProduct(this.product.id)
        });
  }
}
