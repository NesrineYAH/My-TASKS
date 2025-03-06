import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListsComponent } from './task-lists/task-lists.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  imports: [
    CommonModule,
],
  declarations: [
    TaskListsComponent,
    TaskComponent
  ],
  exports: [],

})

export class ComponentsModule { }