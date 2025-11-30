import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

interface Order {
  id: string;
  customer: string;
  date: Date;
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  items: number;
}

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="p-6 border-b flex justify-between items-center">
        <h2 class="text-xl font-bold font-heading">Orders</h2>
        <div class="flex gap-2">
          <button mat-stroked-button>Export</button>
          <button mat-stroked-button>Filter</button>
        </div>
      </div>

      <table mat-table [dataSource]="orders" class="w-full">
        <!-- ID Column -->
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef> Order ID </th>
          <td mat-cell *matCellDef="let order" class="font-mono text-xs text-gray-500"> {{order.id}} </td>
        </ng-container>

        <!-- Customer Column -->
        <ng-container matColumnDef="customer">
          <th mat-header-cell *matHeaderCellDef> Customer </th>
          <td mat-cell *matCellDef="let order" class="font-bold"> {{order.customer}} </td>
        </ng-container>

        <!-- Date Column -->
        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date </th>
          <td mat-cell *matCellDef="let order"> {{order.date | date:'mediumDate'}} </td>
        </ng-container>

        <!-- Items Column -->
        <ng-container matColumnDef="items">
          <th mat-header-cell *matHeaderCellDef> Items </th>
          <td mat-cell *matCellDef="let order"> {{order.items}} items </td>
        </ng-container>

        <!-- Total Column -->
        <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef> Total </th>
          <td mat-cell *matCellDef="let order" class="font-bold text-brand-green"> ₹{{order.total}} </td>
        </ng-container>

        <!-- Status Column -->
        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let order">
            <span class="px-2 py-1 rounded-full text-xs font-bold uppercase"
              [class.bg-yellow-100]="order.status === 'pending'"
              [class.text-yellow-800]="order.status === 'pending'"
              [class.bg-blue-100]="order.status === 'processing'"
              [class.text-blue-800]="order.status === 'processing'"
              [class.bg-green-100]="order.status === 'delivered'"
              [class.text-green-800]="order.status === 'delivered'"
              [class.bg-red-100]="order.status === 'cancelled'"
              [class.text-red-800]="order.status === 'cancelled'">
              {{order.status}}
            </span>
          </td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef> Actions </th>
          <td mat-cell *matCellDef="let order">
            <button mat-icon-button color="primary">
              <mat-icon>visibility</mat-icon>
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
export class OrderListComponent {
  displayedColumns: string[] = ['id', 'customer', 'date', 'items', 'total', 'status', 'actions'];

  orders: Order[] = [
    { id: '#ORD-001', customer: 'Rahul Sharma', date: new Date(), items: 3, total: 450, status: 'pending' },
    { id: '#ORD-002', customer: 'Priya Patel', date: new Date(Date.now() - 86400000), items: 5, total: 1200, status: 'delivered' },
    { id: '#ORD-003', customer: 'Amit Kumar', date: new Date(Date.now() - 172800000), items: 2, total: 300, status: 'cancelled' },
    { id: '#ORD-004', customer: 'Sneha Gupta', date: new Date(), items: 1, total: 150, status: 'processing' },
  ];
}
