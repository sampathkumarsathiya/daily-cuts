import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSnackBarModule],
  template: `
    <div class="max-w-4xl mx-auto py-12">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-heading font-bold mb-4 text-brand-dark">Get in Touch</h1>
        <p class="text-xl text-gray-500">Have questions? We'd love to hear from you.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div>
          <div class="bg-brand-dark text-white p-8 rounded-2xl shadow-lg h-full">
            <h3 class="text-2xl font-bold mb-6">Contact Information</h3>
            <div class="space-y-6">
              <div>
                <p class="text-gray-400 text-sm mb-1">Address</p>
                <p class="font-medium">123, Green Street, Adyar,<br>Chennai, Tamil Nadu 600020</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm mb-1">Phone</p>
                <p class="font-medium">+91 98765 43210</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm mb-1">Email</p>
                <p class="font-medium">hello&#64;dailycuts.com</p>
              </div>
              <div>
                <p class="text-gray-400 text-sm mb-1">Working Hours</p>
                <p class="font-medium">Mon - Sat: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" placeholder="Your Name">
              <mat-error *ngIf="contactForm.get('name')?.hasError('required')">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" placeholder="your&#64;email.com">
              <mat-error *ngIf="contactForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="contactForm.get('email')?.hasError('email')">Please enter a valid email</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Subject</mat-label>
              <input matInput formControlName="subject" placeholder="What is this about?">
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Message</mat-label>
              <textarea matInput formControlName="message" rows="4" placeholder="Your message..."></textarea>
              <mat-error *ngIf="contactForm.get('message')?.hasError('required')">Message is required</mat-error>
            </mat-form-field>

            <button mat-flat-button color="primary" class="w-full py-6 rounded-lg" [disabled]="contactForm.invalid">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private metaService = inject(MetaService);

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required]
  });

  ngOnInit() {
    this.metaService.updateMetaTags({
      title: 'Contact Us',
      description: 'Get in touch with Daily Cuts for any queries or support.'
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Mock API call
      this.snackBar.open('Message sent successfully! We will get back to you soon.', 'Close', { duration: 3000 });
      this.contactForm.reset();
    }
  }
}
