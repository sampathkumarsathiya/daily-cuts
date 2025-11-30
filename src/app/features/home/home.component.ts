import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule],
  template: `
    <div class="space-y-12">
      <!-- Hero Section -->
      <section class="bg-brand-green-dark text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 shadow-xl overflow-hidden relative">
        <div class="z-10 md:w-1/2 space-y-6">
          <h1 class="text-4xl md:text-6xl font-heading font-bold leading-tight">
            Wake up to <span class="text-brand-mango">Freshness</span>.
          </h1>
          <p class="text-lg md:text-xl text-brand-light opacity-90">
            Daily salads, fruit bowls, and native sweets—prepared fresh and delivered with care to your doorstep.
          </p>
          <div class="flex gap-4 pt-4">
            <a routerLink="/menu" mat-raised-button color="accent" class="px-8 py-6 text-lg rounded-full font-bold">Order Now</a>
            <a routerLink="/subscriptions" mat-stroked-button class="px-8 py-6 text-lg rounded-full border-2 text-white border-white hover:bg-white hover:text-brand-green-dark transition-colors">Subscribe</a>
          </div>
        </div>
        <div class="md:w-1/2 relative">
           <!-- Placeholder for Hero Image -->
           <div class="w-full h-64 md:h-96 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
             <span class="text-6xl">🥗</span>
           </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section>
        <div class="flex justify-between items-end mb-8">
          <h2 class="text-3xl font-heading font-bold text-brand-dark">Today's Specials</h2>
          <a routerLink="/menu" class="text-brand-green font-bold hover:underline">View Menu &rarr;</a>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (product of featuredProducts$ | async; track product.id) {
            <mat-card class="hover:shadow-lg transition-shadow rounded-xl overflow-hidden border-none bg-white">
              <div class="h-48 bg-gray-100 flex items-center justify-center relative">
                <span class="text-6xl">
                  @if (product.category === 'salad') { 🥗 }
                  @else if (product.category === 'fruit') { 🥭 }
                  @else { 🍬 }
                </span>
                @if (product.availabilityWindow) {
                  <span class="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {{ product.availabilityWindow }}
                  </span>
                }
              </div>
              <mat-card-content class="p-6">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-xl font-bold font-heading text-brand-dark line-clamp-1">{{ product.name }}</h3>
                  <span class="font-bold text-brand-green">₹{{ product.price }}</span>
                </div>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                  @for (tag of product.dietaryTags; track tag) {
                    <span class="text-xs bg-brand-light text-brand-dark px-2 py-1 rounded-md font-medium">{{ tag }}</span>
                  }
                </div>
              </mat-card-content>
              <mat-card-actions class="p-4 pt-0 flex gap-2">
                <a [routerLink]="['/product', product.slug]" mat-stroked-button color="primary" class="flex-grow rounded-full">Details</a>
                <button mat-flat-button color="primary" class="flex-grow rounded-full">Add</button>
              </mat-card-actions>
            </mat-card>
          }
        </div>
      </section>

      <!-- Trust Badges -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-t border-gray-200">
        <div class="text-center p-4">
          <div class="text-4xl mb-2">🌿</div>
          <h4 class="font-bold text-brand-dark">Fresh Daily</h4>
          <p class="text-sm text-gray-500">Sourced every morning</p>
        </div>
        <div class="text-center p-4">
          <div class="text-4xl mb-2">🚫</div>
          <h4 class="font-bold text-brand-dark">No Preservatives</h4>
          <p class="text-sm text-gray-500">100% natural ingredients</p>
        </div>
        <div class="text-center p-4">
          <div class="text-4xl mb-2">🧼</div>
          <h4 class="font-bold text-brand-dark">Hygiene First</h4>
          <p class="text-sm text-gray-500">Certified kitchens</p>
        </div>
        <div class="text-center p-4">
          <div class="text-4xl mb-2">🍬</div>
          <h4 class="font-bold text-brand-dark">Native Sweets</h4>
          <p class="text-sm text-gray-500">Authentic recipes</p>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  featuredProducts$!: Observable<Product[]>;

  ngOnInit() {
    this.featuredProducts$ = this.productService.getFeaturedProducts();
  }
}
