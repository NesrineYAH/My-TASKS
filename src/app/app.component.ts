import { Component } from '@angular/core';
import { TaskComponent } from './components/task/task.component'
import { HeaderComponent } from './header/header.component'

@Component({
  selector: 'app-root',
  standalone: true,                   
  imports: [HeaderComponent, TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}
