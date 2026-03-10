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
  sortOption: string = '';
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
        this.sortProducts(); // ensure sorted on load
        this.cdr.detectChanges();
      });
    }
  }

  sortProducts() {
    if (!this.products || this.products.length === 0) return;

    if (this.sortOption === 'priceAsc') {
      this.products.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'priceDesc') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'nameAsc') {
      this.products.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'nameDesc') {
      this.products.sort((a, b) => b.name.localeCompare(a.name));
    }

    this.cdr.detectChanges();
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
