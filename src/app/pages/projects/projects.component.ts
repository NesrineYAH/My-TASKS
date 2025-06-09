import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/Project.service';
import { Project } from '../../models/project.model';
import { Task } from '../../models/Task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
// import { error } from 'node:console';

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
 tasks: Task[] = [];

 taskTitle: string = '';
taskDescription: string = '';
task_id: string = ''; // ou un autre type selon ta logique
project: {
  _id: string;
  tasks: Task[];
} = {
  _id: 'example-id', // ou null si tu veux le remplir plus tard
  tasks: [],
};// ou injecté par @Input()

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
     status: 'todo',    
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
      status: 'todo',    
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
attachFileToTask(taskId: string, event: Event): void {

  const input = event.target as HTMLInputElement; 
if(input.files && input.files.length > 0) {
 const file = input.files[0];

  const formData = new FormData();
  formData.append('file', file);
  
this.taskService.uploadFile(taskId, formData).subscribe(response => {
    const task = this.tasks.find(t => t._id === taskId);
       
         if (task) {
      task.attachments = task.attachments || [];
      task.attachments.push(response.fileUrl); // Assure-toi que fileUrl est bien renvoyé
      console.log('Fichier uploadé avec succès :', response);
    } else  {
        console.error('Erreur lors de l\'upload');
      }
  });
} 
  
    
  
}






}


/**
 * task._id! : L’opérateur ! dit à TypeScript "je suis sûr que _id n'est pas undefined".

Or, si task._id n’est pas assuré d’exister, TypeScript te met un trait rouge.
 */