import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  activeSkill: string | null = null;
  skillKeys: string[] = [];
  overallDescription = 'Hover over any skill to see more details. I have experience in various technologies including frontend development with Angular, backend development with Spring Boot, and full-stack integration.';

  constructor() {
    this.skillKeys = Object.keys(this.skillData);
  }

  skillData: any = {
    frontend: {
      title: 'Frontend Development',
      description: 'HTML, CSS, JavaScript, Angular, responsive layouts, animations, and UI logic.'
    },
    backend: {
      title: 'Backend Development',
      description: 'Java, Spring Boot, REST APIs, authentication, database integration.'
    },
    fullstack: {
      title: 'Full-Stack Integration',
      description: 'Connecting Angular frontend with Spring Boot backend, API handling, validation.'
    },
    tools: {
      title: 'Tools',
      description: 'Git, GitHub, Postman, Maven, VS Code, IntelliJ.'
    },
    uiux: {
      title: 'UI / UX',
      description: 'Figma designs, responsive UI, component-based layouts.'
    }
  };

  setSkill(skill: string) {
    this.activeSkill = skill;
    document.body.classList.add('active-skill');
  }

  clearSkill() {
    this.activeSkill = null;
    document.body.classList.remove('active-skill');
  }
}
