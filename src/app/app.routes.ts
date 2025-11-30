import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
            },
            {
                path: 'menu',
                loadComponent: () => import('./features/catalog/catalog-list/catalog-list.component').then(m => m.CatalogListComponent)
            },
            {
                path: 'product/:slug',
                loadComponent: () => import('./features/catalog/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
            },
            {
                path: 'cart',
                loadComponent: () => import('./features/cart/cart-page/cart-page.component').then(m => m.CartPageComponent)
            },
            {
                path: 'checkout',
                loadComponent: () => import('./features/checkout/checkout/checkout.component').then(m => m.CheckoutComponent)
            },
            {
                path: 'subscriptions',
                loadComponent: () => import('./features/subscriptions/subscription-builder/subscription-builder.component').then(m => m.SubscriptionBuilderComponent)
            }
        ]
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: 'products',
                pathMatch: 'full'
            },
            {
                path: 'products',
                loadComponent: () => import('./features/admin/product-list/product-list.component').then(m => m.ProductListComponent)
            },
            {
                path: 'orders',
                loadComponent: () => import('./features/admin/order-list/order-list.component').then(m => m.OrderListComponent)
            }
        ]
    },
    {
        path: 'about',
        loadComponent: () => import('./features/pages/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () => import('./features/pages/contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
