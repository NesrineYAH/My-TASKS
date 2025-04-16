import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { TaskListsComponent } from "./task-lists/task-lists.component";
import { ButtonComponent} from "../../components/button/button.component";

@Component({
  selector: 'app-task',  // doit correspondre à la balise utilisée dans app.component.html
  standalone: true,
  imports: [CommonModule, TaskListsComponent],
  templateUrl: './task.component.html',
styleUrls: ['./task.component.scss']// note le "s" à la fin de styleUrls

})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  lists = [];
  newTaskTitle: string = '';
  newTaskDescription: string = '';


  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  changeStatus(task: Task, status: 'todo' | 'in_progress' | 'done'): void {
    this.taskService.updateTask(task.id!,{status}).subscribe(updatedTask => {
      task.status = updatedTask.status;
      task.updatedAt = updatedTask.updatedAt;
    });
  }

  toggleReminder(task: Task): void {
    const newReminder = !(task.reminder ?? false);
    this.taskService.updateTask(task.id!, {reminder : newReminder}).subscribe(updatedTask => {
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
    const newTask = new Task(title, 'todo', description, dueDate);
    this.taskService.addTask(newTask).subscribe((createdTask) => {
      this.tasks.push(createdTask);
    });
    console.log('Ajouter une tâche...');
  }

  onSelectList(list: any): void {
    console.log('Liste sélectionnée :', list);
  }
}