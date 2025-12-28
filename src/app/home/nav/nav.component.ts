import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isDark = false;
  scrolled = false;
  isMenuOpen = false; // Add this line for mobile menu state
  sections: HTMLElement[] = [];
  currentSection = 0;

  ngOnInit() {
    // Initialize sections after view is ready
    setTimeout(() => {
      this.sections = [
        'home',
        'about',
        'services',
        'skills',
        'projects',
        'contact',
      ]
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
    });
  }

  // Toggle mobile menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  // Close menu and navigate
  navigateAndClose(sectionId: string) {
    this.scrollTo(sectionId);
    this.isMenuOpen = false;
    document.body.style.overflow = ''; // Re-enable body scroll
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;

    if (this.sections.length === 0) return;

    const scrollPosition = window.scrollY + 100;

    this.sections.forEach((section, index) => {
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const sectionId = section.id;
        this.isDark = ['about', 'skills', 'contact'].includes(sectionId);
      }
    });
  }

  // Smooth scroll to section
  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Close menu when clicking outside
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.nav-links') as HTMLElement;
    const hamburger = document.querySelector('.hamburger') as HTMLElement;

    if (
      this.isMenuOpen &&
      !menu.contains(target) &&
      !hamburger.contains(target)
    ) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }

  // Close menu on window resize (optional)
  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
      document.body.style.overflow = '';
    }
  }
}
