import { Component, OnInit  } from '@angular/core';
import { Task } from '../../models/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})

export class TaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  /*changeStatus(task: Task, status: 'todo' | 'in_progress' | 'done') {
    this.taskService.updateTask(task.id!, status);
  }*/

  toggleReminder(task: Task) {
    this.taskService.updateTask(task.id!, undefined, !task.reminder);
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id!);
    this.tasks = this.taskService.getTasks();
  }
}


