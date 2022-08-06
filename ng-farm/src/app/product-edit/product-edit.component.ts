import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/models/product';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @Input() product!: Product;

  constructor(
    private formBuilder: FormBuilder
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
        Validators.pattern(/^[0-9]{1,2}([,.][0-9]{1,2})?$/)
      ]
    ],
    stock_id: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {

  }
}
