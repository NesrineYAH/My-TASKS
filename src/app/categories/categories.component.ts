import { Component, OnInit, Input} from '@angular/core';
import { categorie } from '../models/categorie';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  @Input() faceSnap!: categorie;

  snapButtonText!: string;
  userHasSnapped!: boolean;

  //La méthode  ngOnInit()  est appelée automatiquement par Angular au moment de la création de chaque instance du component. Elle permet notamment d'initialiser des propriétés.
  ngOnInit(): void {
    this.snapButtonText = "Oh snap!";
    this.userHasSnapped =false;
  } 
  
onSnap(): void {
if(this.userHasSnapped ) {
  this.unSnap();
} else {
  this.snap();
}
}
unSnap() {
  this.faceSnap.removeSnap();
  this.snapButtonText = "Oh snap!";
  this.userHasSnapped =false;
}
snap() {
  this.faceSnap.addSnap();
  this.snapButtonText = "Oops; unSnaps";
  this.userHasSnapped =true;
}
}
