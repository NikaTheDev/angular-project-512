import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeroSlider } from '../../shared/components/hero-slider/hero-slider';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [HeroSlider, ProductCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products = signal<any[]>([]);

  private http = inject(HttpClient);

  ngOnInit() {
    this.getHomeProducts();
  }

  getHomeProducts() {
    this.http
      .get<any>('https://api.everrest.educata.dev/shop/products/search', {
        params: {
          page_size: 8,
          page_index: 1,
        },
      })
      .subscribe({
        next: (data) => {
          this.products.set(data.products);
        },
      });
  }
}
