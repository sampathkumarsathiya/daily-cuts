import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-brand-dark text-white py-12 mt-auto">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-heading font-bold mb-4 text-brand-green">Daily Cuts</h3>
          <p class="text-gray-400 text-sm">Fresh daily salads, fruits, and native sweets—delivered with care.</p>
        </div>
        
        <div>
          <h4 class="font-bold mb-4">Shop</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a routerLink="/menu" class="hover:text-brand-mango transition-colors">Menu</a></li>
            <li><a routerLink="/subscriptions" class="hover:text-brand-mango transition-colors">Subscriptions</a></li>
            <li><a routerLink="/menu" [queryParams]="{category: 'native-sweets'}" class="hover:text-brand-mango transition-colors">Native Sweets</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4">Company</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a routerLink="/about" class="hover:text-brand-mango transition-colors">About Us</a></li>
            <li><a routerLink="/sourcing" class="hover:text-brand-mango transition-colors">Sourcing</a></li>
            <li><a routerLink="/contact" class="hover:text-brand-mango transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold mb-4">Legal</h4>
          <ul class="space-y-2 text-sm text-gray-400">
            <li><a routerLink="/privacy" class="hover:text-brand-mango transition-colors">Privacy Policy</a></li>
            <li><a routerLink="/terms" class="hover:text-brand-mango transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
        &copy; {{ currentYear }} Daily Cuts. All rights reserved.
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
