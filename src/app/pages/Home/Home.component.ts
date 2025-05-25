import { Component } from '@angular/core';
import { SideBarComponent } from '../../components/sideBar/sideBar.component';
import { TaskComponent } from '../task/task.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [SideBarComponent , TaskComponent, RouterModule],
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent {

}
