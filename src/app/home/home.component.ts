import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { ServicesComponent } from './services/services.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    NavbarComponent,
    PageComponent,
    ServicesComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent
],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
