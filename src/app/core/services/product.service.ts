import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: '1',
      slug: 'green-goddess-salad',
      name: 'Green Goddess Salad',
      category: 'salad',
      description: 'A mix of kale, spinach, avocado, and cucumber with our signature green goddess dressing.',
      ingredients: ['Kale', 'Spinach', 'Avocado', 'Cucumber', 'Green Goddess Dressing'],
      allergens: ['Dairy'],
      nutrition: { kcal: 350, protein: 12, carbs: 20, fat: 25, sugar: 5 },
      price: 250,
      image: 'assets/images/green-goddess.jpg',
      dietaryTags: ['Vegetarian', 'Gluten-Free'],
      isFeatured: true,
      stock: 50
    },
    {
      id: '2',
      slug: 'tropical-fruit-bowl',
      name: 'Tropical Fruit Bowl',
      category: 'fruit',
      description: 'Fresh mango, pineapple, papaya, and pomegranate.',
      ingredients: ['Mango', 'Pineapple', 'Papaya', 'Pomegranate'],
      allergens: [],
      nutrition: { kcal: 200, protein: 2, carbs: 45, fat: 1, sugar: 35 },
      price: 180,
      image: 'assets/images/tropical-fruit.jpg',
      dietaryTags: ['Vegan', 'Gluten-Free'],
      isFeatured: true,
      stock: 30
    },
    {
      id: '3',
      slug: 'mysore-pak',
      name: 'Ghee Mysore Pak',
      category: 'sweet',
      description: 'Melt-in-your-mouth traditional Mysore Pak made with pure ghee.',
      ingredients: ['Gram Flour', 'Ghee', 'Sugar'],
      allergens: ['Dairy'],
      nutrition: { kcal: 450, protein: 4, carbs: 50, fat: 30, sugar: 40 },
      price: 300,
      image: 'assets/images/mysore-pak.jpg',
      dietaryTags: ['Vegetarian'],
      isFeatured: false,
      stock: 20
    }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return of(this.products.find(p => p.slug === slug));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.isFeatured));
  }
}
