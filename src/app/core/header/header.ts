import { Component, signal } from '@angular/core';
import { Logo } from '../../shared/components/logo/logo';
import { Nav } from '../../shared/components/nav/nav';
import { RouterLink } from '@angular/router';
import { MobileNav } from '../../shared/components/mobile-nav/mobile-nav';

@Component({
  selector: 'app-header',
  imports: [Logo, Nav, RouterLink, MobileNav],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isMenuOpen = signal(false);

  menuToggle() {
    this.isMenuOpen.update(() => !this.isMenuOpen());
  }
}
