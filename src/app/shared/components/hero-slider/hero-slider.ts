import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero-slider',
  imports: [],
  templateUrl: './hero-slider.html',
  styleUrl: './hero-slider.css',
})
export class HeroSlider {
  activeSlide = signal(0);

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  slides = [
    {
      title: 'Upgrade your everyday tech',
      text: 'Find laptops, phones and accessories from trusted brands.',
      image:
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Fresh deals on smartphones',
      text: 'Discover powerful phones with modern design and sharp displays.',
      image:
        'https://images.unsplash.com/photo-1616353071588-708dcff912e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Work faster with better gear',
      text: 'Choose devices that match your work, study and gaming needs.',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  nextSlide() {
    if (this.activeSlide() === this.slides.length - 1) {
      this.activeSlide.set(0);
    } else {
      this.activeSlide.update((index) => index + 1);
    }
  }

  goToSlide(index: number) {
    this.activeSlide.set(index);
  }
}
