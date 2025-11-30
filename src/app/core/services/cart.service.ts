import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadFromStorage());

  items = computed(() => this.cartItems());

  count = computed(() => this.cartItems().reduce((acc, item) => acc + item.quantity, 0));

  total = computed(() => this.cartItems().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

  constructor() {
    effect(() => {
      this.saveToStorage(this.cartItems());
    });
  }

  addToCart(product: Product) {
    this.cartItems.update(items => {
      const existingItem = items.find(item => item.product.id === product.id);
      if (existingItem) {
        return items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: string) {
    this.cartItems.update(items => items.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem('daily_cuts_cart', JSON.stringify(items));
  }

  private loadFromStorage(): CartItem[] {
    const stored = localStorage.getItem('daily_cuts_cart');
    return stored ? JSON.parse(stored) : [];
  }
}
