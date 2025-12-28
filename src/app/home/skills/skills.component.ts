import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent {
  activeSkill: string | null = null;
  skillKeys: string[] = [];
  overallDescription =
    'Hover over any skill to see more details. I have experience in various technologies including frontend development with Angular, backend development with Spring Boot, and full-stack integration.';

  @ViewChild('skillDescription', { static: true })
  skillDescription!: ElementRef<HTMLElement>;

  constructor() {
    this.skillKeys = Object.keys(this.skillData);
  }

  skillData: any = {
    frontend: {
      title: 'Frontend Development',
      description:
        'HTML, CSS, JavaScript, Angular, responsive layouts, animations, and UI logic.',
    },
    backend: {
      title: 'Backend Development',
      description:
        'Java, Spring Boot, REST APIs, authentication, database integration.',
    },
    fullstack: {
      title: 'Full-Stack Integration',
      description:
        'Connecting Angular frontend with Spring Boot backend, API handling, validation.',
    },
    tools: {
      title: 'Tools',
      description: 'Git, GitHub, Postman, Maven, VS Code, IntelliJ.',
    },
    uiux: {
      title: 'UI / UX',
      description: 'Figma designs, responsive UI, component-based layouts.',
    },
  };

  setSkill(skill: string) {
    this.activeSkill = skill;
    document.body.classList.add('active-skill');
  }

  clearSkill() {
    this.activeSkill = null;
    document.body.classList.remove('active-skill');
  }

  onSkillEnter(skill: string, event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;

    this.setSkill(skill);

    gsap.killTweensOf(target);
    gsap.to(target, {
      duration: 0.25,
      ease: 'power3.out',
      x: '0.8vw',
      scale: 1.02,
      backgroundColor: '#e1e1e1',
      color: '#111',
      borderLeftColor: '#222',
    });

    const title = target.querySelector('h4');
    if (title) {
      gsap.killTweensOf(title);
      gsap.to(title, { duration: 0.25, ease: 'power3.out', scale: 1.03 });
    }

    setTimeout(() => this.animateDescription(), 0);
  }

  onSkillLeave(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;

    this.clearSkill();

    gsap.killTweensOf(target);
    gsap.to(target, {
      duration: 0.25,
      ease: 'power3.out',
      x: 0,
      scale: 1,
      backgroundColor: '#333',
      color: '#fff',
      borderLeftColor: 'transparent',
    });

    const title = target.querySelector('h4');
    if (title) {
      gsap.killTweensOf(title);
      gsap.to(title, { duration: 0.25, ease: 'power3.out', scale: 1 });
    }

    setTimeout(() => this.animateDescription(), 0);
  }

  private animateDescription() {
    const container = this.skillDescription?.nativeElement?.querySelector(
      '.description-content'
    ) as HTMLElement | null;

    if (!container) return;

    gsap.killTweensOf(container);
    gsap.fromTo(
      container,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' }
    );
  }
}
