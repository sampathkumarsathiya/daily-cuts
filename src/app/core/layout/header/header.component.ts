import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { CartService } from '../../../core/services/cart.service';
import { ScrollMessageService } from '../../../core/services/scroll-message.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule],
  template: `
    <div *ngIf="activeMessage$ | async as message" class="scroll-message">
      {{ message }}
    </div>
    <mat-toolbar color="primary" class="sticky top-0 z-50 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/" class="text-2xl font-heading font-bold text-white no-underline flex items-center gap-2">
          <mat-icon>eco</mat-icon>
          Daily Cuts
        </a>

        <nav class="hidden md:flex gap-6">
          <a routerLink="/menu" routerLinkActive="font-bold" class="text-white no-underline hover:text-brand-mango transition-colors">Menu</a>
          <a routerLink="/subscriptions" routerLinkActive="font-bold" class="text-white no-underline hover:text-brand-mango transition-colors">Subscriptions</a>
          <a routerLink="/about" routerLinkActive="font-bold" class="text-white no-underline hover:text-brand-mango transition-colors">About</a>
        </nav>

        <div class="flex items-center gap-4">
          <button mat-icon-button class="text-white" aria-label="Search">
            <mat-icon>search</mat-icon>
          </button>
          <button mat-icon-button class="text-white" aria-label="Cart" routerLink="/cart">
            <mat-icon [matBadge]="cartService.count()" [matBadgeHidden]="cartService.count() === 0" matBadgeColor="accent">shopping_cart</mat-icon>
          </button>
          <button mat-icon-button class="md:hidden text-white" aria-label="Menu">
            <mat-icon>menu</mat-icon>
          </button>
        </div>
      </div>
    </mat-toolbar>
  `
  styles: []
})
export class HeaderComponent {
  cartService = inject(CartService);
  private scrollMessageService = inject(ScrollMessageService);
  activeMessage$ = this.scrollMessageService.getActiveMessage();
}
