import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
title: string = 'Task Tracker';


constructor() {}

}
