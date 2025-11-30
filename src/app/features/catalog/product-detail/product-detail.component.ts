import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, MatDividerModule, MatExpansionModule],
  template: `
    @if (product$ | async; as product) {
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Image Section -->
        <div class="bg-gray-100 rounded-3xl h-96 md:h-[500px] flex items-center justify-center relative overflow-hidden">
          <span class="text-9xl">
            @if (product.category === 'salad') { 🥗 }
            @else if (product.category === 'fruit') { 🥭 }
            @else { 🍬 }
          </span>
          @if (product.availabilityWindow) {
            <div class="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full backdrop-blur-sm">
              Available: {{ product.availabilityWindow }}
            </div>
          }
        </div>

        <!-- Details Section -->
        <div class="space-y-8">
          <div>
            <div class="flex flex-wrap gap-2 mb-4">
              @for (tag of product.dietaryTags; track tag) {
                <span class="text-sm bg-brand-light text-brand-dark px-3 py-1 rounded-full font-bold uppercase tracking-wide">{{ tag }}</span>
              }
            </div>
            <h1 class="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-2">{{ product.name }}</h1>
            <p class="text-2xl font-bold text-brand-green">₹{{ product.price }}</p>
          </div>

          <p class="text-lg text-gray-600 leading-relaxed">{{ product.description }}</p>

          <div class="flex gap-4">
            <button mat-flat-button color="primary" class="flex-grow py-6 text-lg rounded-full">Add to Cart</button>
            <button mat-stroked-button class="px-6 rounded-full border-2">
              <mat-icon>favorite_border</mat-icon>
            </button>
          </div>

          <mat-divider></mat-divider>

          <div class="space-y-4">
             <mat-accordion>
              <mat-expansion-panel expanded>
                <mat-expansion-panel-header>
                  <mat-panel-title class="font-bold">Ingredients</mat-panel-title>
                </mat-expansion-panel-header>
                <ul class="list-disc list-inside text-gray-600 space-y-1">
                  @for (ingredient of product.ingredients; track ingredient) {
                    <li>{{ ingredient }}</li>
                  }
                </ul>
              </mat-expansion-panel>

              <mat-expansion-panel>
                <mat-expansion-panel-header>
                  <mat-panel-title class="font-bold">Nutrition (per serving)</mat-panel-title>
                </mat-expansion-panel-header>
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div class="flex justify-between">
                    <span class="text-gray-500">Calories</span>
                    <span class="font-bold">{{ product.nutrition.kcal }} kcal</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Protein</span>
                    <span class="font-bold">{{ product.nutrition.protein }}g</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Carbs</span>
                    <span class="font-bold">{{ product.nutrition.carbs }}g</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-500">Fat</span>
                    <span class="font-bold">{{ product.nutrition.fat }}g</span>
                  </div>
                </div>
              </mat-expansion-panel>

               @if (product.allergens.length > 0) {
                <mat-expansion-panel>
                  <mat-expansion-panel-header>
                    <mat-panel-title class="font-bold text-brand-berry">Allergens</mat-panel-title>
                  </mat-expansion-panel-header>
                  <p class="text-brand-berry">{{ product.allergens.join(', ') }}</p>
                </mat-expansion-panel>
               }
            </mat-accordion>
          </div>
        </div>
      </div>
    } @else {
      <div class="text-center py-20">
        <p>Loading product...</p>
      </div>
    }
  `,
  styles: []
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  product$!: Observable<Product | undefined>;

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        return this.productService.getProductBySlug(slug || '');
      })
    );
  }
}
