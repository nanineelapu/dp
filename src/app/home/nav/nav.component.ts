import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isDark = false;
  scrolled = false;
  isMenuOpen = false;
  sections: HTMLElement[] = [];
  currentSection = 'home';

  // Define which sections should have dark navbar
  private readonly darkSections = ['about', 'skills', 'contact'];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.initializeSections();
    this.setInitialTheme();
  }

  private initializeSections() {
    setTimeout(() => {
      this.sections = ['home', 'about', 'skills', 'contact']
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];
    });
  }

  private setInitialTheme() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      const homeRect = homeSection.getBoundingClientRect();
      if (homeRect.bottom > 0) {
        this.isDark = false;
      }
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  private updateActiveSection() {
    if (this.sections.length === 0) return;

    const scrollPosition = window.scrollY + window.innerHeight * 0.3; // Adjust offset as needed

    for (const section of this.sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        this.currentSection = section.id;
        this.isDark = this.darkSections.includes(section.id);
        return;
      }
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyScroll(this.isMenuOpen);
  }

  navigateAndClose(sectionId: string) {
    this.scrollTo(sectionId);
    this.isMenuOpen = false;
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(disable: boolean) {
    this.renderer.setStyle(document.body, 'overflow', disable ? 'hidden' : '');
  }

  private scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

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
      this.closeMenu();
    }
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth > 768) {
      this.closeMenu();
    }
  }

  private closeMenu() {
    this.isMenuOpen = false;
    this.toggleBodyScroll(false);
  }
}
