import { Routes } from '@angular/router';
// import {ActivatedRoute, Params, Router} from "@angular/router";
import { TaskComponent } from './pages/task/task.component';
import { TaskListsComponent } from './pages/task-lists/task-lists.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { HomeComponent } from './pages/Home/Home.component';
import { ProjectsComponent } from './pages/projects/projects.component';


export const appRoutes: Routes = [
 { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'lists', component: TaskListsComponent }, // ✅ route ajoutée
  { path: 'new-list', component: TaskListsComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
 { path: 'tasks', component: TaskComponent },
  { path: 'tasks/:listId', component: TaskComponent }, //
  { path: 'lists/:listId', component: TaskComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: '**', redirectTo: 'lists' }
];
