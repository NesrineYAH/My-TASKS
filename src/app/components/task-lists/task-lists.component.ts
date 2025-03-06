import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
 standalone: true,
  selector: 'app-task-lists',
  imports: [CommonModule],
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit, OnChanges {
  @Input() lists: Array<{ [key: string]: any }> = [];//Liste des tâches reçues du parent
  @Output() selectTask: EventEmitter<any>; //Émetteur d'événements vers le parent

  randomColorIndex = 0; // Un index utilisé pour choisir une couleur.
   //Initialise selectTask comme un EventEmitter, permettant d’émettre des événements.  
  constructor() {
    this.selectTask = new EventEmitter();
  }
   // mettre par default  list tasks
  ngOnInit() {
    this.lists = this.lists || []; // Assure que `lists` n'est jamais `undefined`
    this.updateLists(); //Met à jour la liste des tâches
  }
  ngOnChanges() {
    this.updateLists(); //Met à jour la liste des tâches quand `@Input lists` change
  }

  /**
   * It change values of received object from parent
   * Add cssClass property to the lists
   */
  updateLists(): void {
    if (this.lists) {
      this.lists.map((item: any) => {
        item.cssClass = this.getBoxColor(); //Ajoute une classe CSS à chaque élément -Parcourt lists et ajoute une classe CSS à chaque élément.
      });
    }
  }


   // Dummy function that pick a color and return a css class based on the item index
   // The index is choose based on randomColorIndex

  getBoxColor(): string {
    const colors = this.createBoxColors();
    const color = colors[this.randomColorIndex];
    this.randomColorIndex = this.randomColorIndex < colors.length ? 1 : this.randomColorIndex + 1;
    return `square square-${color}`;
  }

  /**
   * @returns array of colors
   * Create an array of colors
   */
  createBoxColors(): Array<string> {
    return ['red', 'green', 'orange', 'blue'];
  }

  /**
   * @param list item that selected by the user
   */
  //Lorsque l'utilisateur sélectionne une tâche, celle-ci est émise vers le parent via selectTask.emit(list).
  onSelectList(list: Object): void {
    this.selectTask.emit(list);
  }
}

