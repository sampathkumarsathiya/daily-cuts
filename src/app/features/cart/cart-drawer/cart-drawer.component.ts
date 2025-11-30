import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatListModule, MatDividerModule],
  template: `
    <div class="h-full flex flex-col bg-white w-80 shadow-xl">
      <div class="p-4 flex justify-between items-center border-b">
        <h2 class="text-xl font-bold font-heading">Your Cart</h2>
        <button mat-icon-button (click)="closeDrawer()">
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <div class="flex-grow overflow-y-auto p-4">
        @if (cartService.items().length === 0) {
          <div class="text-center py-12 text-gray-500">
            <mat-icon class="text-4xl mb-2">shopping_basket</mat-icon>
            <p>Your cart is empty</p>
            <a routerLink="/menu" mat-button color="primary" (click)="closeDrawer()">Start Shopping</a>
          </div>
        } @else {
          <div class="space-y-4">
            @for (item of cartService.items(); track item.product.id) {
              <div class="flex gap-4 items-start">
                <img [src]="item.product.image" [alt]="item.product.name" class="w-16 h-16 object-cover rounded-lg bg-gray-100">
                <div class="flex-grow">
                  <h3 class="font-bold text-sm line-clamp-1">{{ item.product.name }}</h3>
                  <p class="text-brand-green font-bold text-sm">₹{{ item.product.price }}</p>
                  
                  <div class="flex items-center gap-2 mt-2">
                    <button mat-icon-button class="w-6 h-6 flex items-center justify-center border rounded-full" (click)="cartService.updateQuantity(item.product.id, item.quantity - 1)">
                      <mat-icon class="text-sm">remove</mat-icon>
                    </button>
                    <span class="text-sm font-bold w-4 text-center">{{ item.quantity }}</span>
                    <button mat-icon-button class="w-6 h-6 flex items-center justify-center border rounded-full" (click)="cartService.addToCart(item.product)">
                      <mat-icon class="text-sm">add</mat-icon>
                    </button>
                  </div>
                </div>
                <button mat-icon-button color="warn" (click)="cartService.removeFromCart(item.product.id)">
                  <mat-icon>delete_outline</mat-icon>
                </button>
              </div>
              <mat-divider></mat-divider>
            }
          </div>
        }
      </div>

      <div class="p-4 border-t bg-gray-50">
        <div class="flex justify-between items-center mb-4">
          <span class="text-gray-600">Subtotal</span>
          <span class="font-bold text-xl">₹{{ cartService.total() }}</span>
        </div>
        <a routerLink="/cart" mat-flat-button color="primary" class="w-full py-6 rounded-full text-lg" [disabled]="cartService.items().length === 0" (click)="closeDrawer()">
          Checkout
        </a>
      </div>
    </div>
  `,
  styles: []
})
export class CartDrawerComponent {
  cartService = inject(CartService);

  closeDrawer() {
    // Logic to close drawer (e.g. via a service or output)
    // For now, we'll assume it's handled by the parent or router
  }
}
