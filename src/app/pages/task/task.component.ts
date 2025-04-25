import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NewTaskComponent } from '../new-task/new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'; 
import { TaskListsComponent } from '../task-lists/task-lists.component'; // ajuste le chemin si nécessaire
import { TaskList } from '../../models/task-list.model';
import { ListService } from '../../services/List.service';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskListsComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  lists: TaskList[] = []; // ✅ bien typé ici
  newTaskTitle: string = '';
  newTaskDescription: string = '';
  priority: 'low' | 'medium' | 'high' = 'medium';
  listIds: number[] = []; // instead of: listId: number 
  selectedCategory: string = '';

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private listService: ListService,
  ) {}

  ngOnInit(): void {
  // Charger les listes au démarrage
  this.listService.getLists().subscribe(lists => {
    this.lists = lists; // 👈 stocke les listes récupérées
    console.log('Listes récupérées depuis l’API :', this.lists);
  });

  // Ensuite charger les tâches selon l’ID passé dans l’URL
  this.route.params.subscribe(params => {
    const listIdParam = params['listId'];
    const listId = Number(listIdParam);

    if (!isNaN(listId)) {
      this.listIds = [listId]; // 👈 store it in array form
      this.loadTasksByList();
    } else {
      this.loadTasks(); // fallback
    }
  });
}

loadTasksByList(): void {
  this.taskService.getTasks().subscribe((tasks) => {
    this.tasks = tasks.filter(task => 
      task.listId !== undefined && this.listIds.includes(task.listId)
    );  });
}

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  changeStatus(task: Task, status: 'todo' | 'in_progress' | 'done'): void {
    this.taskService.updateTask(task.id!, { status }).subscribe(updatedTask => {
      task.status = updatedTask.status;
      task.updatedAt = updatedTask.updatedAt;
    });
  }

  toggleReminder(task: Task): void {
    const newReminder = !(task.reminder ?? false);
    this.taskService.updateTask(task.id!, { reminder: newReminder }).subscribe(updatedTask => {
      task.reminder = updatedTask.reminder;
      task.updatedAt = updatedTask.updatedAt;
    });
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id!).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }

  addTask(title: string, description?: string, dueDate?: Date): void {
    const newTask = new Task(this.newTaskTitle, 'todo', this.newTaskDescription);
       // newTask.listId = this.listId;
  // 👇 Choisir le premier listId (ou un autre logique métier)

  newTask.listId = this.listIds[0];
    newTask.priority = this.priority;

    this.taskService.addTask(newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
      alert('Bravo votre tache est ajoutée');
      this.newTaskTitle = '';
      this.newTaskDescription = '';
    });
  }

  openNewTaskDialog(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '500px',
      data: { listId: this.listIds[0] } //// 👈 même logique
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.loadTasksByList();  // 👈 déjà corrigée
      }
    });
  }

  get categories(): string[] {
    const categories = this.tasks
      .map((t: Task) => t.category)
      .filter((cat): cat is string => !!cat);
    return Array.from(new Set(categories));
  }

  filteredTasks(): Task[] {
    if (!this.selectedCategory) return this.tasks;
    return this.tasks.filter(t => t.category === this.selectedCategory);
  }
 
/*
  onSelectList(selectedList: { id: number, name: string }): void {
    this.listIds = [selectedList.id];
    this.loadTasksByList(); // recharge les tâches liées à cette liste
  }*/
  onSelectList(list: TaskList): void {
    console.log('Liste sélectionnée :', list);
    this.listIds = [list.id];
    this.loadTasksByList(); // recharge les tâches
  }
  
}
