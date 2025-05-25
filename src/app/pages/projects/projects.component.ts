import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project.service';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project',
  standalone: true,
      imports: [CommonModule, FormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { name: '', description: '', category : ''};

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe(data => this.projects = data);
  }

  addProject(): void {
    if (!this.newProject.name.trim()) return;

    this.projectService.addProject(this.newProject).subscribe(project => {
      this.projects.push(project);
      this.newProject = { name: '', description: '' , category: '' };
    });
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(p => p._id !== id);
    });
  }
}
