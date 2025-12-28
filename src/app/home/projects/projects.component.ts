import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  @ViewChild('imageTrack', { static: true })
  imageTrack!: ElementRef<HTMLDivElement>;
  @ViewChild('imageTrack2', { static: false })
  imageTrack2!: ElementRef<HTMLDivElement>;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY;
    const speed = 0.1; // adjust speed (0.2 slow, 0.6 fast)

    this.imageTrack.nativeElement.style.transform = `translateX(${
      -scrollY * speed
    }px)`;
    if (this.imageTrack2) {
      this.imageTrack2.nativeElement.style.transform = `translateX(${
        -scrollY * 0.3
      }px)`;
    }
  }
}
