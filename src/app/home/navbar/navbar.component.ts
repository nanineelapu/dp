import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit(): void {
    window.addEventListener('scroll', this.onWindowScroll);
  }

  onWindowScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const element = document.querySelector(sectionId);
    if (element) {
      // Calculate the position to scroll to, accounting for the fixed navbar
      const yOffset = -70; // Adjust this value based on your navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  }
}