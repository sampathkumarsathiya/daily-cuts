import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductService } from '../../../core/services/product.service';
import { Product, ProductCategory } from '../../../core/models/product.model';
import { Observable, combineLatest, BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'app-catalog-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters Sidebar -->
      <aside class="w-full md:w-64 space-y-8 shrink-0">
        <div>
          <h3 class="font-heading font-bold text-lg mb-4 flex items-center gap-2">
            <mat-icon>filter_list</mat-icon> Filters
          </h3>
          
          <div class="space-y-6">
            <!-- Search -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Search</mat-label>
              <input matInput [(ngModel)]="searchQuery" (ngModelChange)="updateFilters()" placeholder="Salad, Sweet...">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <!-- Categories -->
            <div>
              <h4 class="font-bold text-sm text-gray-500 mb-2 uppercase tracking-wider">Category</h4>
              <mat-chip-listbox multiple aria-label="Category selection" (change)="onCategoryChange($event)">
                <mat-chip-option value="salad" [selected]="selectedCategories.has('salad')">Salads</mat-chip-option>
                <mat-chip-option value="fruit" [selected]="selectedCategories.has('fruit')">Fruits</mat-chip-option>
                <mat-chip-option value="sweet" [selected]="selectedCategories.has('sweet')">Sweets</mat-chip-option>
              </mat-chip-listbox>
            </div>

            <!-- Price Range (Mock) -->
             <div>
              <h4 class="font-bold text-sm text-gray-500 mb-2 uppercase tracking-wider">Price</h4>
              <div class="flex gap-2">
                <button mat-stroked-button class="rounded-full text-xs">Under ₹200</button>
                <button mat-stroked-button class="rounded-full text-xs">₹200 - ₹500</button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="flex-grow">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-3xl font-heading font-bold text-brand-dark">Menu</h1>
          <span class="text-gray-500">{{ (filteredProducts$ | async)?.length }} items</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (product of filteredProducts$ | async; track product.id) {
            <mat-card class="hover:shadow-lg transition-shadow rounded-xl overflow-hidden border-none bg-white h-full flex flex-col">
              <div class="h-48 bg-gray-100 flex items-center justify-center relative group cursor-pointer" [routerLink]="['/product', product.slug]">
                <span class="text-6xl transform group-hover:scale-110 transition-transform duration-300">
                  @if (product.category === 'salad') { 🥗 }
                  @else if (product.category === 'fruit') { 🥭 }
                  @else { 🍬 }
                </span>
              </div>
              <mat-card-content class="p-5 flex-grow">
                <div class="flex justify-between items-start mb-2">
                  <h3 class="text-lg font-bold font-heading text-brand-dark line-clamp-1 hover:text-brand-green cursor-pointer" [routerLink]="['/product', product.slug]">
                    {{ product.name }}
                  </h3>
                  <span class="font-bold text-brand-green">₹{{ product.price }}</span>
                </div>
                <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ product.description }}</p>
                <div class="flex flex-wrap gap-2">
                  @for (tag of product.dietaryTags; track tag) {
                    <span class="text-[10px] bg-brand-light text-brand-dark px-2 py-1 rounded-md font-medium uppercase tracking-wide">{{ tag }}</span>
                  }
                </div>
              </mat-card-content>
              <mat-card-actions class="p-4 pt-0 mt-auto">
                <button mat-flat-button color="primary" class="w-full rounded-full">Add to Cart</button>
              </mat-card-actions>
            </mat-card>
          } @empty {
            <div class="col-span-full text-center py-12 text-gray-500">
              <mat-icon class="text-4xl mb-2">search_off</mat-icon>
              <p>No products found matching your filters.</p>
              <button mat-button color="primary" (click)="resetFilters()">Clear Filters</button>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CatalogListComponent implements OnInit {
  private productService = inject(ProductService);

  products$ = this.productService.getProducts();
  searchQuery = '';
  selectedCategories = new Set<ProductCategory>();

  private filterSubject = new BehaviorSubject<{ query: string, categories: Set<ProductCategory> }>({
    query: '',
    categories: new Set()
  });

  filteredProducts$!: Observable<Product[]>;

  ngOnInit() {
    this.filteredProducts$ = combineLatest([
      this.products$,
      this.filterSubject
    ]).pipe(
      map(([products, filters]) => {
        return products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
            product.description.toLowerCase().includes(filters.query.toLowerCase());
          const matchesCategory = filters.categories.size === 0 || filters.categories.has(product.category);
          return matchesSearch && matchesCategory;
        });
      })
    );
  }

  updateFilters() {
    this.filterSubject.next({
      query: this.searchQuery,
      categories: this.selectedCategories
    });
  }

  onCategoryChange(event: any) {
    // Note: In a real app, we'd parse the event better. 
    // For now, assuming we can get the selected values.
    // Since MatChipListbox is complex, let's simplify for this MVP or fix the type.
    // Actually, let's just toggle manually for simplicity in this MVP if event is tricky without full types.
    // But MatChipListbox emits a change event.

    // Let's rely on the fact that we can bind to the selection or handle click.
    // For this MVP, let's assume single select or handle it simpler.
    // Let's just use the values from the event if possible, or bind to a model.

    // Simpler approach:
    // We'll update the set based on the event value if it's available.
    // But let's just use a simpler click handler on chips if needed.
    // Or better, use the `selectionChange` event.

    const value = event.value; // This might be an array or single value depending on multiple
    this.selectedCategories.clear();
    if (Array.isArray(value)) {
      value.forEach(v => this.selectedCategories.add(v));
    } else if (value) {
      this.selectedCategories.add(value);
    }
    this.updateFilters();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategories.clear();
    this.updateFilters();
  }
}
