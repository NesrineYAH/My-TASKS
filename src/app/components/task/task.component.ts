import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  //standalone: true,
  selector: 'app-task',  // doit correspondre à la balise utilisée dans app.component.html
    imports: [CommonModule],
  templateUrl: './task.component.html',
styleUrls: ['./task.component.scss']// note le "s" à la fin de styleUrls

})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    }); 
  }

  changeStatus(task: Task, status: 'todo' | 'in_progress' | 'done') {
    this.taskService.updateTask(task.id!, status);
  }

  toggleReminder(task: Task) {
    task.reminder = !(task.reminder ?? false);
    this.taskService.updateTask(task.id!, undefined, task.reminder);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id!).subscribe(() => {
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      });
    });
  }
 /* addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }*/
  addTask(title: string, description?: string, dueDate?: Date): Task {
    const newTask = new Task(title, 'todo', description, dueDate);
    newTask.id = this.tasks.length+1;  //// Simuler un ID auto-incrémenté
    this.tasks.push(newTask);
    return newTask;
  }
}