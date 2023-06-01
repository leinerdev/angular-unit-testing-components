import { Component, OnInit } from '@angular/core';
import { ValueService } from 'src/app/services/value.service';
import { Product } from './../../models/product.model';

import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  rta = '';

  constructor(
    private productService: ProductService,
    private valueService: ValueService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAll()
    .subscribe(products => {
      this.products = products;
    });
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }

}
