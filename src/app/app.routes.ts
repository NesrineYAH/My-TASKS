import { Routes } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';
import { TaskListsComponent } from './pages/task-lists/task-lists.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { HomeComponent } from './pages/Home/Home.component';
import { ProjectComponent } from './pages/projects/projects.component';
import { AgendaComponent } from './pages/agenda/agenda.component';



export const appRoutes: Routes = [
  { path: 'Home', component: HomeComponent }, // accueil
{ path: 'agenda', component: AgendaComponent }, // accueil
  { path: 'lists', component: TaskListsComponent }, // page des listes
  { path: 'tasks', component: TaskComponent }, // page des tâches
  { path: 'new-list', component: TaskListsComponent }, // ou à changer ?
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId', component: TaskComponent },
  { path: 'projects', component: ProjectComponent },
  { path: '**', redirectTo: '' }, // fallback
  
];
