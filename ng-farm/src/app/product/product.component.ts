import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/models/product';
import { trigger, style, animate, transition } from '@angular/animations';

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
  showEditProduct: Boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleEditProduct() {
    this.showEditProduct = !this.showEditProduct;
  }
}
