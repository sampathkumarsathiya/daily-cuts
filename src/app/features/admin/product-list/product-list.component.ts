import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold font-heading">Products</h2>
        <button mat-flat-button color="primary">
          <mat-icon>add</mat-icon> Add Product
        </button>
      </div>

      <table mat-table [dataSource]="products$" class="w-full">
        <!-- Image Column -->
        <ng-container matColumnDef="image">
          <th mat-header-cell *matHeaderCellDef> Image </th>
          <td mat-cell *matCellDef="let product">
            <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
              @if (product.category === 'salad') { 🥗 }
              @else if (product.category === 'fruit') { 🥭 }
              @else { 🍬 }
            </div>
          </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let product" class="font-bold"> {{product.name}} </td>
        </ng-container>

        <!-- Category Column -->
        <ng-container matColumnDef="category">
          <th mat-header-cell *matHeaderCellDef> Category </th>
          <td mat-cell *matCellDef="let product"> 
            <span class="capitalize px-2 py-1 bg-gray-100 rounded-md text-xs font-bold">{{product.category}}</span>
          </td>
        </ng-container>

        <!-- Price Column -->
        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef> Price </th>
          <td mat-cell *matCellDef="let product"> ₹{{product.price}} </td>
        </ng-container>

        <!-- Stock Column -->
        <ng-container matColumnDef="stock">
          <th mat-header-cell *matHeaderCellDef> Stock </th>
          <td mat-cell *matCellDef="let product"> 
            <span [class.text-red-500]="product.stock < 10" [class.text-green-600]="product.stock >= 10">
              {{product.stock}} units
            </span>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let product">
            <button mat-icon-button color="primary">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);

  products$!: Observable<Product[]>;
  displayedColumns: string[] = ['image', 'name', 'category', 'price', 'stock', 'actions'];

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }
}
