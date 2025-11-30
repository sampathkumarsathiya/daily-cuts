import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule, MatToolbarModule, MatButtonModule],
  template: `
    <div class="h-screen flex flex-col">
      <mat-toolbar color="primary" class="z-10 shadow-md">
        <span class="font-heading font-bold">Daily Cuts Admin</span>
        <span class="flex-grow"></span>
        <a routerLink="/" mat-button>Back to Store</a>
      </mat-toolbar>

      <mat-sidenav-container class="flex-grow">
        <mat-sidenav mode="side" opened class="w-64 border-r">
          <mat-nav-list>
            <a mat-list-item routerLink="/admin/products" routerLinkActive="bg-gray-100 text-brand-green">
              <mat-icon matListItemIcon>inventory_2</mat-icon>
              <span matListItemTitle>Products</span>
            </a>
            <a mat-list-item routerLink="/admin/orders" routerLinkActive="bg-gray-100 text-brand-green">
              <mat-icon matListItemIcon>receipt_long</mat-icon>
              <span matListItemTitle>Orders</span>
            </a>
            <a mat-list-item routerLink="/admin/subscriptions" routerLinkActive="bg-gray-100 text-brand-green">
              <mat-icon matListItemIcon>card_membership</mat-icon>
              <span matListItemTitle>Subscriptions</span>
            </a>
          </mat-nav-list>
        </mat-sidenav>
        <mat-sidenav-content class="p-8 bg-gray-50">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent { }
