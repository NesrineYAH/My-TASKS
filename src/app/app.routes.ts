import { Routes } from '@angular/router';
import { TaskComponent } from './pages/task/task.component';
import { TaskListsComponent } from './pages/task-lists/task-lists.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
//import { HomeComponent } from './pages/Home/Home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { DashboardComponent } from './components/dashboard.component/dashboard.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent }, // accueil
  { path: 'lists', component: TaskListsComponent }, // page des listes
  { path: 'tasks', component: TaskComponent }, // page des tâches
  { path: 'new-list', component: TaskListsComponent }, // ou à changer ?
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId', component: TaskComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', redirectTo: '' }, // fallback
  
];
