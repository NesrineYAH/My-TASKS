import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
//import { ButtonComponent} from "../../components/button/button.component";
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard.component/dashboard.component'



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule ,RouterModule, HeaderComponent, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'Frontend'
}
