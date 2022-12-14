import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product, Stock } from 'src/models/product';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @Input() product!: Product;
  stocks!: Stock[];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) {}

  productEditForm = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(100)
      ]
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.maxLength(500)
      ],
    ],
    price: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?!,$)[\d,.]+$/)
      ]
    ],
    stock_id: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.productService.fetchStocks()
      .subscribe(stocks => this.stocks = stocks)
  }

  onSubmit(): void {
    if (this.productEditForm.valid && this.product.id) {
      this.productService.putProduct(this.product.id, this.productEditForm.value)
        .subscribe(product => {
          const price = parseFloat(`${product.price}`.replace(/,/, '.'));
          this.productService.updateProduct({ ...product, price: price })
        });
    }
  }
}
