import { Component,  OnInit} from '@angular/core';
import { CategoriesComponent } from '../categories/categories.component';
import { categorie } from '../models/categorie';
import { FaceSnapsService } from '../services/face-snaps.service'

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CategoriesComponent],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.scss'
})
export class CategoriesListComponent implements OnInit{
 
faceSnaps! : categorie[];
myCategorie!: categorie;
myOtherCategorie!: categorie;
myLastCategorie!: categorie;

constructor(private faceSnapsService: FaceSnapsService) {

}


ngOnInit(): void {
  this.faceSnaps = this.faceSnapsService.getFaceSnaps();
}
}
