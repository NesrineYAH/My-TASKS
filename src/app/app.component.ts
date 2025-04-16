import { Component } from '@angular/core';
import { TaskComponent } from './pages/task/task.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
//import { TaskListsComponent } from './components/task-lists/task-lists.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, ButtonComponent, TaskComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'My Tasks'
}
