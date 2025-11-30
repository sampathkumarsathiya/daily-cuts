import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../../../core/services/product.service';
import { SubscriptionPlan } from '../../../core/models/subscription.model';
import { Product } from '../../../core/models/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subscription-builder',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-heading font-bold mb-4">Build Your Subscription Box</h1>
        <p class="text-xl text-gray-500">Fresh, healthy meals delivered to your door, on your schedule.</p>
      </div>

      <mat-stepper linear #stepper class="bg-transparent">
        <!-- Step 1: Choose Plan -->
        <mat-step [stepControl]="planForm">
          <ng-template matStepLabel>Choose Plan</ng-template>
          <div class="py-8">
            <form [formGroup]="planForm">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                @for (plan of plans; track plan.id) {
                  <div 
                    class="border-2 rounded-2xl p-6 cursor-pointer transition-all hover:shadow-xl bg-white relative overflow-hidden"
                    [class.border-brand-green]="planForm.get('planId')?.value === plan.id"
                    [class.border-gray-200]="planForm.get('planId')?.value !== plan.id"
                    (click)="selectPlan(plan.id)"
                  >
                    @if (planForm.get('planId')?.value === plan.id) {
                      <div class="absolute top-0 right-0 bg-brand-green text-white p-2 rounded-bl-xl">
                        <mat-icon>check</mat-icon>
                      </div>
                    }
                    <h3 class="text-2xl font-bold font-heading mb-2">{{ plan.name }}</h3>
                    <p class="text-3xl font-bold text-brand-green mb-4">₹{{ plan.price }}<span class="text-sm text-gray-500 font-normal">/{{ plan.type }}</span></p>
                    <p class="text-gray-500 mb-6">{{ plan.description }}</p>
                    <ul class="space-y-2 mb-6">
                      @for (feature of plan.features; track feature) {
                        <li class="flex items-center gap-2 text-sm text-gray-600">
                          <mat-icon class="text-brand-green text-sm h-4 w-4">check_circle</mat-icon>
                          {{ feature }}
                        </li>
                      }
                    </ul>
                    <button mat-flat-button color="primary" class="w-full rounded-full" type="button" (click)="selectPlan(plan.id)">Select</button>
                  </div>
                }
              </div>
              <input type="hidden" formControlName="planId">
              <div class="flex justify-end mt-8">
                <button mat-raised-button color="primary" matStepperNext [disabled]="planForm.invalid" class="rounded-full px-8">Next: Customize</button>
              </div>
            </form>
          </div>
        </mat-step>

        <!-- Step 2: Customize Box -->
        <mat-step>
          <ng-template matStepLabel>Customize Box</ng-template>
          <div class="py-8">
            <h3 class="text-xl font-bold mb-6">Select your meals for the week</h3>
            <div class="space-y-6">
              @for (day of days; track day) {
                <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div class="flex flex-col md:flex-row gap-4 items-center">
                    <div class="w-full md:w-32">
                      <h4 class="font-bold text-lg text-brand-dark">{{ day }}</h4>
                    </div>
                    <div class="flex-grow w-full">
                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Select Meal</mat-label>
                        <mat-select (selectionChange)="updateSelection(day, $event.value)">
                          <mat-option>None (Skip)</mat-option>
                          @for (product of products$ | async; track product.id) {
                            <mat-option [value]="product">
                              {{ product.name }} ({{ product.category | titlecase }})
                            </mat-option>
                          }
                        </mat-select>
                      </mat-form-field>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div class="flex justify-end gap-4 mt-8">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-raised-button color="primary" matStepperNext class="rounded-full px-8">Next: Review</button>
            </div>
          </div>
        </mat-step>

        <!-- Step 3: Review & Subscribe -->
        <mat-step>
          <ng-template matStepLabel>Review</ng-template>
          <div class="py-8 max-w-2xl mx-auto">
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <h3 class="text-2xl font-bold font-heading mb-6 text-center">Subscription Summary</h3>
              
              <div class="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p class="text-sm text-gray-500">Plan</p>
                  <p class="font-bold text-lg">{{ getSelectedPlan()?.name }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-500">Price</p>
                  <p class="font-bold text-lg text-brand-green">₹{{ getSelectedPlan()?.price }}</p>
                </div>
              </div>

              <div class="mb-8">
                <h4 class="font-bold mb-4">Your Weekly Menu</h4>
                <div class="space-y-3">
                  @for (item of selectedItems | keyvalue; track item.key) {
                    <div class="flex justify-between text-sm">
                      <span class="font-medium text-gray-700">{{ item.key }}</span>
                      <span class="text-gray-600">{{ item.value.name }}</span>
                    </div>
                  }
                  @if ((selectedItems | keyvalue).length === 0) {
                    <p class="text-gray-500 italic">No meals selected yet.</p>
                  }
                </div>
              </div>

              <button mat-flat-button color="primary" class="w-full py-6 text-lg rounded-full mb-4" (click)="subscribe()">
                Confirm Subscription
              </button>
              <p class="text-xs text-center text-gray-400">
                By subscribing, you agree to our Terms of Service. You can pause or cancel anytime.
              </p>
            </div>
            <div class="flex justify-start mt-8">
              <button mat-button matStepperPrevious>Back</button>
            </div>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: []
})
export class SubscriptionBuilderComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  products$!: Observable<Product[]>;

  planForm = this.fb.group({
    planId: ['', Validators.required]
  });

  plans: SubscriptionPlan[] = [
    {
      id: 'daily-starter',
      name: 'Daily Starter',
      type: 'daily',
      price: 1500,
      description: 'Perfect for trying out. 5 meals/week.',
      features: ['5 Salads/Fruits per week', 'Free Delivery', 'Pause anytime']
    },
    {
      id: 'weekly-pro',
      name: 'Weekly Pro',
      type: 'weekly',
      price: 2800,
      description: 'Commit to health. 10 meals/week (Lunch + Dinner).',
      features: ['10 Meals per week', 'Includes Native Sweets', 'Priority Delivery', 'Free Nutrition Consult']
    },
    {
      id: 'monthly-elite',
      name: 'Monthly Elite',
      type: 'monthly',
      price: 11000,
      description: 'Full lifestyle change. All meals covered.',
      features: ['Full Month Coverage', 'Custom Diet Plan', 'Weekend Specials', 'Dedicated Support']
    }
  ];

  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  selectedItems: { [key: string]: Product } = {};

  ngOnInit() {
    this.products$ = this.productService.getProducts();
  }

  selectPlan(planId: string) {
    this.planForm.patchValue({ planId });
  }

  getSelectedPlan() {
    return this.plans.find(p => p.id === this.planForm.get('planId')?.value);
  }

  updateSelection(day: string, product: Product) {
    if (product) {
      this.selectedItems[day] = product;
    } else {
      delete this.selectedItems[day];
    }
  }

  subscribe() {
    // Mock API call
    this.snackBar.open('Subscription created successfully! Welcome to Daily Cuts.', 'Close', { duration: 3000 });
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1500);
  }
}
