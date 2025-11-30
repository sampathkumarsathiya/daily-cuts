import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  template: `
    <div class="max-w-4xl mx-auto">
      <h1 class="text-3xl font-heading font-bold mb-8">Checkout</h1>

      @if (cartService.items().length === 0) {
        <div class="text-center py-12 bg-white rounded-xl shadow-sm">
          <p class="text-gray-500 mb-4">Your cart is empty.</p>
          <a routerLink="/menu" mat-raised-button color="primary">Continue Shopping</a>
        </div>
      } @else {
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="md:col-span-2">
            <mat-stepper linear #stepper>
              <!-- Address Step -->
              <mat-step [stepControl]="addressForm">
                <ng-template matStepLabel>Delivery Address</ng-template>
                <form [formGroup]="addressForm" class="py-4 space-y-4">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Full Name</mat-label>
                    <input matInput formControlName="name" placeholder="John Doe">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Street Address</mat-label>
                    <input matInput formControlName="street" placeholder="123 Green St">
                  </mat-form-field>

                  <div class="grid grid-cols-2 gap-4">
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>City</mat-label>
                      <input matInput formControlName="city" placeholder="Chennai">
                    </mat-form-field>
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Pincode</mat-label>
                      <input matInput formControlName="pincode" placeholder="600001">
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Phone Number</mat-label>
                    <input matInput formControlName="phone" placeholder="9876543210">
                  </mat-form-field>

                  <div class="flex justify-end">
                    <button mat-button matStepperNext>Next</button>
                  </div>
                </form>
              </mat-step>

              <!-- Delivery Slot Step -->
              <mat-step [stepControl]="slotForm">
                <ng-template matStepLabel>Delivery Slot</ng-template>
                <form [formGroup]="slotForm" class="py-4 space-y-4">
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Choose Date</mat-label>
                    <input matInput [matDatepicker]="picker" formControlName="date">
                    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
                    <mat-datepicker #picker></mat-datepicker>
                  </mat-form-field>

                  <div class="space-y-2">
                    <label class="block font-bold text-gray-700">Select Time Slot</label>
                    <mat-radio-group formControlName="time" class="flex flex-col gap-2">
                      <mat-radio-button value="morning">Morning (7 AM - 10 AM)</mat-radio-button>
                      <mat-radio-button value="lunch">Lunch (12 PM - 2 PM)</mat-radio-button>
                      <mat-radio-button value="evening">Evening (5 PM - 8 PM)</mat-radio-button>
                    </mat-radio-group>
                  </div>

                  <div class="flex justify-end gap-2">
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-button matStepperNext>Next</button>
                  </div>
                </form>
              </mat-step>

              <!-- Payment Step -->
              <mat-step>
                <ng-template matStepLabel>Payment</ng-template>
                <div class="py-4 space-y-6">
                  <div class="bg-gray-50 p-4 rounded-lg border">
                    <h3 class="font-bold mb-2">Order Summary</h3>
                    <div class="flex justify-between text-sm mb-1">
                      <span>Subtotal</span>
                      <span>₹{{ cartService.total() }}</span>
                    </div>
                    <div class="flex justify-between text-sm mb-1">
                      <span>Delivery Fee</span>
                      <span>₹40</span>
                    </div>
                    <div class="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                      <span>Total</span>
                      <span>₹{{ cartService.total() + 40 }}</span>
                    </div>
                  </div>

                  <div class="space-y-2">
                     <label class="block font-bold text-gray-700">Payment Method</label>
                     <mat-radio-group [(ngModel)]="paymentMethod" class="flex flex-col gap-2">
                      <mat-radio-button value="upi">UPI / GPay / PhonePe</mat-radio-button>
                      <mat-radio-button value="card">Credit / Debit Card</mat-radio-button>
                      <mat-radio-button value="cod">Cash on Delivery</mat-radio-button>
                    </mat-radio-group>
                  </div>

                  <div class="flex justify-end gap-2">
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-raised-button color="primary" (click)="placeOrder()">Place Order</button>
                  </div>
                </div>
              </mat-step>
            </mat-stepper>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="hidden md:block">
            <div class="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <h3 class="font-bold text-lg mb-4">Order Summary</h3>
              <div class="space-y-4 mb-4">
                @for (item of cartService.items(); track item.product.id) {
                  <div class="flex justify-between text-sm">
                    <span>{{ item.quantity }}x {{ item.product.name }}</span>
                    <span>₹{{ item.product.price * item.quantity }}</span>
                  </div>
                }
              </div>
              <div class="border-t pt-4">
                <div class="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{{ cartService.total() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class CheckoutComponent {
  cartService = inject(CartService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  addressForm = this.fb.group({
    name: ['', Validators.required],
    street: ['', Validators.required],
    city: ['Chennai', Validators.required],
    pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  slotForm = this.fb.group({
    date: [new Date(), Validators.required],
    time: ['morning', Validators.required]
  });

  paymentMethod = 'upi';

  placeOrder() {
    if (this.addressForm.valid && this.slotForm.valid) {
      // Mock API call
      setTimeout(() => {
        this.cartService.clearCart();
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/']);
      }, 1000);
    } else {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
    }
  }
}
