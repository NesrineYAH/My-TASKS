   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   //import { ComponentsModule } from '../app/components/components.module'
   import { AppComponent } from './app.component';
  //import { TaskService } from './services/task.service';
   import { HeaderComponent } from './components/header/header.component';
   import { ButtonComponent } from './components/button/button.component';
   import { TaskComponent } from './pages/task/task.component';
   import {TaskListsComponent} from "./pages/task/task-lists/task-lists.component";
   import { HttpClientModule } from '@angular/common/http';

 @NgModule({
   declarations: [
  
   ], 
     imports: [
        HttpClientModule,
        BrowserModule,
        AppComponent,
        HeaderComponent,
         ButtonComponent,
          TaskComponent,
          TaskListsComponent
  ],
     providers: []
  })

   export class AppModule { }
