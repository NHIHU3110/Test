import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping',
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping.html',
  styleUrl: './shopping.css'
})
export class Shopping implements OnInit {
  products: any[] = [];
  searchPrice: number | null = null;
  quantityMap: { [key: string]: number } = {};

  constructor(private apiService: ApiService, private cartService: CartService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    if (this.searchPrice !== null && this.searchPrice !== undefined && this.searchPrice.toString() !== '') {
      this.apiService.searchProducts(this.searchPrice).subscribe(data => {
        this.products = data;
        this.initQuantities();
        this.cdr.detectChanges();
      });
    } else {
      this.apiService.getProducts().subscribe(data => {
        this.products = data;
        this.initQuantities();
        this.cdr.detectChanges();
      });
    }
  }

  initQuantities() {
    this.products.forEach(p => {
      if (!this.quantityMap[p._id]) {
        this.quantityMap[p._id] = 1;
      }
    });
  }

  search() {
    this.loadProducts();
  }

  addToCart(product: any) {
    const qty = this.quantityMap[product._id] || 1;
    this.cartService.addToCart(product, qty);
    alert('Added to cart!');
  }
}
