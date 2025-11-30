import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaService } from '../../../core/services/meta.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto py-12">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-heading font-bold mb-4 text-brand-dark">Our Story</h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto">Bringing the freshest produce from local farms directly to your table in Chennai.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" alt="Fresh Produce" class="rounded-2xl shadow-lg w-full h-96 object-cover">
        </div>
        <div>
          <h2 class="text-3xl font-heading font-bold mb-6 text-brand-green">Freshness First</h2>
          <p class="text-gray-600 mb-4 leading-relaxed">
            Daily Cuts was born from a simple idea: healthy eating shouldn't be a chore. We realized that while everyone wants to eat fresh salads and fruits, the hassle of sourcing, cleaning, and chopping often gets in the way.
          </p>
          <p class="text-gray-600 leading-relaxed">
            We partner directly with local farmers in Tamil Nadu to source the highest quality seasonal produce. Our team carefully inspects, cleans, and prepares every order just hours before delivery, ensuring you get maximum nutrition and taste.
          </p>
        </div>
      </div>

      <div class="bg-brand-light rounded-3xl p-12 text-center mb-20">
        <h2 class="text-3xl font-heading font-bold mb-8">Why Choose Daily Cuts?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="text-4xl mb-4">🚜</div>
            <h3 class="font-bold text-lg mb-2">Farm to Fork</h3>
            <p class="text-sm text-gray-500">Sourced directly from local farmers within 24 hours of harvest.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="text-4xl mb-4">🧼</div>
            <h3 class="font-bold text-lg mb-2">Hygienically Prepped</h3>
            <p class="text-sm text-gray-500">Washed with ozone water and packed in sterile environments.</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-sm">
            <div class="text-4xl mb-4">🚚</div>
            <h3 class="font-bold text-lg mb-2">Zero Waste Delivery</h3>
            <p class="text-sm text-gray-500">Delivered in eco-friendly, reusable or compostable packaging.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  private metaService = inject(MetaService);

  ngOnInit() {
    this.metaService.updateMetaTags({
      title: 'About Us',
      description: 'Learn about Daily Cuts and our mission to deliver fresh, healthy salads and fruits in Chennai.',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e'
    });
  }
}
