import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Stock } from 'src/models/product';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  stocks!: Stock[];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) {}

  productCreateForm = this.formBuilder.group({
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
    if (this.productCreateForm.valid) {
      this.productService.createProduct(this.productCreateForm.value)
        .subscribe(
          product => {
            const price = parseFloat(`${product.price}`.replace(/,/, '.'));
            this.productService.setProduct({ ...product, price: price });
          }
        );
    }
  }
}
