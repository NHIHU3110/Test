import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
    this.authService.user$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    if (!this.isLoggedIn) {
      alert('You must Login first!');
      return;
    }
    if (this.cartItems.length === 0) return;

    const user = this.authService.getCurrentUser();

    // Construct Order
    const orderData = {
      customerId: user._id,
      totalAmount: this.totalAmount,
      status: 'paid'
    };

    this.apiService.createOrder(orderData).subscribe(res => {
      alert('Payment successful! Cart is now finished.');
      this.cartService.clearCart();
    }, err => {
      alert('Payment failed: ' + err.message);
    });
  }
}
