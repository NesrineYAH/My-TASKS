import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component'
import { categorie } from './models/categorie';

@Component({
  selector: 'app-root',
  standalone: true,                   //Ajouté 08/01/2025
  imports: [CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  faceSnaps! : categorie[];

myCategorie!: categorie;
myOtherCategorie!: categorie;
myLastCategorie!: categorie;

ngOnInit(): void {
  this.faceSnaps = [
 new categorie(
      "NES's Personnal Application",
      "Mon meilleur ami c'est  le coran!",
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg',
      new Date(), 
       15,
    ), 
 new categorie(
      'My work',
     "My Best wishes iin this life is to stay in good health",
     "https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_960_720.jpg",
     new Date(),
     35
    ),
new categorie(
      "Nes Professionnal Project",
      "My Best wishes iin this life is to stay in good health",
      "https://media.istockphoto.com/id/528617646/fr/photo/ours-en-peluche-assis-sur-un-banc-de-parc-soft-mise-au-point.jpg?s=1024x1024&w=is&k=20&c=uKQOfgERtVu1lStgJnZEzoCT60Qho8qLYEgXgUEyy-g=",
      new Date(),
      160
     )
  ]
  
   this.faceSnaps[1].setLocation('paris');
}
  
}
