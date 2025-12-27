import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    // Add scroll event listener to handle navbar style changes
    window.addEventListener('scroll', this.onWindowScroll);
  }

  // Handle window scroll
  onWindowScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  // Smooth scroll to section
  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }

  // Clean up event listener
  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }
}