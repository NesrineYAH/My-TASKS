import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../services/task.service';
import { NewTaskComponent } from '../new-task/new-task.component';

@Component({
  selector: 'app-project',
  standalone: true,
      imports: [CommonModule, FormsModule, TaskComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  newProject: Project = { name: '', description: '', category : ''};
 tasks: Task[] = [];


  constructor(private projectService: ProjectService,
              private taskService: TaskService) {}
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
  // add task to project
  
addTaskToProject(projectId: string, taskTitle: string, taskDescription: string): void {
  const newTask: Task = {
   title: taskTitle, 
   description: taskDescription,
   completed: false,
    projectId
  };

  this.taskService.addTask(newTask).subscribe(task => {
    const project = this.projects.find(p => p._id === projectId);
  if (project?.tasks) {
    project.tasks.push(task);
  } else if (project) {
    project.tasks = [task];
  }
  })
}
addSubTask(parentTaskId: string, title: string): void {
  const subTask: Task = {
    title,
    status,
    completed: false,
    parentTaskId
  };

this.taskService.addTask(subTask).subscribe(newSubTask => {
  const parentTask = this.tasks.find(t => t._id === parentTaskId); 
  if(parentTask?.subTasks) {
parentTask.subTasks.push(newSubTask);
  } else if (parentTask) {
parentTask.subTasks = [newSubTask]
  }
});
}

// add note for project 
addNoteToTask(taskId: string, note: string): void {
  this.taskService.updateTask(taskId, { notes: note }).subscribe(updated => {
    const task = this.tasks.find(t => t._id === taskId);
    if (task) task.notes = note;
  });
}

// add attach file for project 

attachFileToTask(taskId: string, file: File): void {
  const formData = new FormData();
  formData.append('file', file);

  this.taskService.uploadFile(taskId, file).subscribe(response => {
    const task = this.tasks.find(t => t._id === taskId);
    if (task) {
      task.attachments = task.attachments || [];
      task.attachments.push(response.fileUrl);
    }
  });
}

onFileSelected(event: Event, taskId: string) {
  const fileInput = event.target as HTMLInputElement;     // ???????????????????????
  if (fileInput.files && fileInput.files.length > 0) {
    const file = fileInput.files[0];

    // Envoie directement le fichier à la méthode
    this.taskService.uploadFile(taskId, file).subscribe({
      next: (response) => {
        console.log('Fichier uploadé avec succès :', response);
      },
      error: (error) => {
        console.error('Erreur lors de l\'upload', error);
      }
    });
  }
}





}
