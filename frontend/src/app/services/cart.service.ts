import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: any[] = [];
    private cartSubject = new BehaviorSubject<any[]>(this.cartItems);
    cart$ = this.cartSubject.asObservable();

    constructor() { }

    addToCart(product: any, quantity: number) {
        const existing = this.cartItems.find(item => item.product._id === product._id);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.cartItems.push({ product, quantity });
        }
        this.cartSubject.next(this.cartItems);
    }

    removeFromCart(productId: string) {
        this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
        this.cartSubject.next(this.cartItems);
    }

    updateQuantity(productId: string, quantity: number) {
        const item = this.cartItems.find(i => i.product._id === productId);
        if (item) {
            item.quantity = quantity;
        }
        this.cartSubject.next(this.cartItems);
    }

    getCartItems() {
        return this.cartItems;
    }

    clearCart() {
        this.cartItems = [];
        this.cartSubject.next(this.cartItems);
    }
}
