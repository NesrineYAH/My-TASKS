import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../../pages/task/task.component';
import { NewTaskComponent } from '../../pages/new-task/new-task.component';
import { TaskListsComponent } from '../../pages/task-lists/task-lists.component';
import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/List.service'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskComponent, NewTaskComponent, TaskListsComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'] 
})
export class DashboardComponent implements OnInit {
  private taskService = inject(TaskService);
  private listService = inject(ListService);

  tasks: any[] = [];
  lists: any[] = [];

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => (this.tasks = data),
      error: (err) => console.error('Erreur chargement tâches', err)
    });

    this.listService.getLists().subscribe({
      next: (data) => (this.lists = data),
      error: (err) => console.error('Erreur chargement listes', err)
    });
  }
}
