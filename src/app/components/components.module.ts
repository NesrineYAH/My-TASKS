import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListsComponent } from '../pages/task/task-lists/task-lists.component';
import { TaskComponent } from '../pages/task/task.component';

@NgModule({
  imports: [
    CommonModule,
    TaskListsComponent,
    TaskComponent
],
  declarations: [

  ],
  exports: [],

})

export class ComponentsModule { }