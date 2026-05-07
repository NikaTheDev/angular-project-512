import { Component } from '@angular/core';
import { Logo } from "../../shared/components/logo/logo";
import { Nav } from "../../shared/components/nav/nav";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [Logo, Nav, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
