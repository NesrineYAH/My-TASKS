import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component'


@Component({
  selector: 'app-root',
  standalone: true,                   //Ajouté 08/01/2025
  imports: [CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MY_TASKS';
}
