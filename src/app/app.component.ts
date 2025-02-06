import { Component } from '@angular/core';
import { TaskComponent } from './components/task/task.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent ,TaskComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

}
