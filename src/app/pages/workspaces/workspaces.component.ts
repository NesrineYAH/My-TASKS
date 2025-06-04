import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { TaskComponent } from '../task/task.component';
import { SideBarComponent} from "../../components/sideBar/sideBar.component";


@Component({
  selector: 'app-workspaces',
    standalone: true,
  imports: [SideBarComponent , RouterModule],
  templateUrl: './workspaces.component.html',
  styleUrl: './workspaces.component.scss'
})
export class WorkspacesComponent {
  
}
