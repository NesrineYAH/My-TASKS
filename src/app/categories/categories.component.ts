import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent  {
  title!: string;
  description!: string;
  createdAt!: Date;
  snaps!: number;
  imageUrl!: string;
  snapButtonText!: string;
  userHasSnapped!: boolean;

  //La méthode  ngOnInit()  est appelée automatiquement par Angular au moment de la création de chaque instance du component. Elle permet notamment d'initialiser des propriétés.
  ngOnInit(): void {
    this.title = "NES's Personnal Application ";
    this.description = 'Mon meilleur ami depuis toujours mes enfant que dien les gardes!';
    this.createdAt = new Date();
    this.snaps = 4;
    this.imageUrl = "https://avatars.githubusercontent.com/u/113270141?s=400&u=8716f7b25f29ead76b7a682bfd81029d2046e265&v=4";
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
  this.snaps--;
  this.snapButtonText = "Oh snap!";
  this.userHasSnapped =false;
}
snap() {
  this.snaps++;
  this.snapButtonText = "Oops; unSnaps";
  this.userHasSnapped =true;
}

}
