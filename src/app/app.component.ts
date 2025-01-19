import { Component } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { HeaderComponent } from './header/header.component'
@Component({
  selector: 'app-root',
  standalone: true,                   
  imports: [HeaderComponent, CategoriesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {

}
