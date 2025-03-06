   import { NgModule } from '@angular/core';
   import { BrowserModule } from '@angular/platform-browser';
   //import { ComponentsModule } from '../app/components/components.module'
   import { AppComponent } from './app.component';
  //import { TaskService } from './services/task.service';
   import { HeaderComponent } from './components/header/header.component';
   import { ButtonComponent } from './components/button/button.component';
   import { TaskComponent } from './components/task/task.component';
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
  ],
     providers: []
  })

   export class AppModule { }
