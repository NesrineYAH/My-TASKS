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

/*
✅ Dans une app classique avec NgModule
Dans une application non standalone, tu importes RouterModule une seule fois dans AppModule, et c’est suffisant pour tous les composants.

Mais dans une application standalone comme la tienne, tu dois importer RouterModule dans chaque composant qui utilise une directive liée au routing.
*/