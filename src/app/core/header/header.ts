import { Component } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { Nav } from "../../shared/components/nav/nav";

@Component({
  selector: 'app-header',
  imports: [Logo, Nav],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
