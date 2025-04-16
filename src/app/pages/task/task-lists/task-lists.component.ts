import { Component, OnInit, Input, EventEmitter, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';


interface TaskList {
  name: string;
  cssClass?: string;
  // ajoute d'autres propriétés si besoin
}

@Component({
  selector: 'app-task-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})

export class TaskListsComponent implements OnInit, OnChanges {
// @Input() lists: Array<{ [key: string]: any }> = [];
@Input() lists: TaskList[]= [];
@Output() selectTask: EventEmitter<any>; 


  randomColorIndex = 0; 
 
   constructor() {
    this.selectTask = new EventEmitter();
  }
  ngOnInit() {
    console.log("Task lists on init:", this.lists);
    this.lists = this.lists || []; 
    this.updateLists(); //Met à jour la liste des tâches
    console.log('LISTS:', this.lists);

  }
  ngOnChanges() {
    console.log("Task lists on change:", this.lists);
    this.updateLists(); //Met à jour la liste des tâches quand `@Input lists` change
    console.log('LISTS:', this.lists);

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

