import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../../pages/task/task.component';
import { NewTaskComponent } from '../../pages/new-task/new-task.component';
import { TaskListsComponent } from '../../pages/task-lists/task-lists.component';
import { TaskService } from '../../services/task.service';
import { ListService } from '../../services/List.service'; 
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sideBar',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule, TaskComponent, TaskListsComponent, NewTaskComponent],
  templateUrl:'./sideBar.component.html',
  styleUrls: ['./sideBar.component.scss'] 
})
export class SideBarComponent implements OnInit {
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
