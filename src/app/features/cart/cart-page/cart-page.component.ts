import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatTableModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-heading font-bold mb-8">Shopping Cart</h1>

      @if (cartService.items().length === 0) {
        <div class="text-center py-20 bg-white rounded-3xl shadow-sm">
          <mat-icon class="text-6xl text-gray-300 mb-4">shopping_cart</mat-icon>
          <h2 class="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
          <p class="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
          <a routerLink="/menu" mat-raised-button color="primary" class="px-8 py-6 rounded-full text-lg">Start Shopping</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="md:col-span-2 space-y-4">
            @for (item of cartService.items(); track item.product.id) {
              <div class="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-center">
                <img [src]="item.product.image" [alt]="item.product.name" class="w-24 h-24 object-cover rounded-lg bg-gray-100">
                
                <div class="flex-grow">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-bold text-lg font-heading text-brand-dark">{{ item.product.name }}</h3>
                    <span class="font-bold text-lg text-brand-green">₹{{ item.product.price * item.quantity }}</span>
                  </div>
                  <p class="text-sm text-gray-500 mb-4">{{ item.product.category | titlecase }}</p>
                  
                  <div class="flex justify-between items-center">
                    <div class="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                      <button mat-icon-button class="w-8 h-8 flex items-center justify-center" (click)="cartService.updateQuantity(item.product.id, item.quantity - 1)">
                        <mat-icon class="text-sm">remove</mat-icon>
                      </button>
                      <span class="font-bold w-6 text-center">{{ item.quantity }}</span>
                      <button mat-icon-button class="w-8 h-8 flex items-center justify-center" (click)="cartService.addToCart(item.product)">
                        <mat-icon class="text-sm">add</mat-icon>
                      </button>
                    </div>
                    
                    <button mat-button color="warn" (click)="cartService.removeFromCart(item.product.id)">Remove</button>
                  </div>
                </div>
              </div>
            }
          </div>

          <!-- Summary -->
          <div class="md:col-span-1">
            <div class="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h3 class="font-bold text-xl mb-6">Order Summary</h3>
              
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{{ cartService.total() }}</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span class="text-green-600">Free</span>
                </div>
                <div class="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>₹0</span>
                </div>
              </div>

              <div class="border-t pt-4 mb-8">
                <div class="flex justify-between font-bold text-xl">
                  <span>Total</span>
                  <span>₹{{ cartService.total() }}</span>
                </div>
              </div>

              <a routerLink="/checkout" mat-flat-button color="primary" class="w-full py-6 rounded-full text-lg mb-4">
                Proceed to Checkout
              </a>
              
              <a routerLink="/menu" mat-stroked-button class="w-full rounded-full">
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class CartPageComponent {
  cartService = inject(CartService);
}
