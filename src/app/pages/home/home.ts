import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ProductCard } from '../../shared/components/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  productsList = signal<any>(null);

  private http = inject(HttpClient);

  pageSize = signal(10);
  pageIndex = signal(1);

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.http
      .get('https://api.everrest.educata.dev/shop/products/all', {
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
    this.pageIndex.update((x) => x + 1);
    this.getProducts();
  }

  prevPage() {
    if (this.pageIndex() > 1) {
      this.pageIndex.update((x) => x - 1);
      this.getProducts();
    }
  }
}
