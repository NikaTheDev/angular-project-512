import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';
import { HeroSlider } from '../../shared/components/hero-slider/hero-slider';

@Component({
  selector: 'app-home',
  imports: [ProductCard, HeroSlider],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productsList = signal<any>(null);

  pageSize = signal(10);
  pageIndex = signal(1);

  private http = inject(HttpClient);

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http
      .get<any>('https://api.everrest.educata.dev/shop/products/search', {
        params: {
          page_size: this.pageSize(),
          page_index: this.pageIndex(),
        },
      })
      .subscribe({
        next: (data) => {
          this.productsList.set(data);
        },
      });
  }

  nextPage() {
    if (this.productsList() && this.pageIndex() * this.pageSize() < this.productsList().total) {
      this.pageIndex.update((page) => page + 1);
      this.getProducts();
    }
  }

  prevPage() {
    if (this.pageIndex() > 1) {
      this.pageIndex.update((page) => page - 1);
      this.getProducts();
    }
  }
}
