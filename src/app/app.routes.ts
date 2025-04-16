import { Routes } from '@angular/router';
import { TaskListsComponent } from './pages/task/task-lists/task-lists.component'


export const routes: Routes = [
{
    path: '',
    component: TaskListsComponent,
    title: 'Tasks',
    canActivate: []  
}
];

