export type ProductCategory = 'salad' | 'fruit' | 'sweet';

export interface Product {
    id: string;
    slug: string;
    name: string;
    category: ProductCategory;
    description: string;
    ingredients: string[];
    allergens: string[];
    nutrition: {
        kcal: number;
        protein: number;
        carbs: number;
        fat: number;
        sugar: number;
    };
    price: number;
    image: string;
    availabilityWindow?: string;
    dietaryTags: string[];
    isFeatured: boolean;
    stock: number;
}
