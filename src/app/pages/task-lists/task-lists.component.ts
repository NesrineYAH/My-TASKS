import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../models/task-list.model';
import { Task } from '../../models/Task';
import { ListService  } from '../../services/List.service';
import { TaskService  } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewTaskComponent } from '../new-task/new-task.component';



@Component({
  selector: 'app-task-lists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit, OnChanges {
  @Input() lists: TaskList[] = [];
  @Output() selectList: EventEmitter<TaskList> = new EventEmitter<TaskList>();
 
  newListName: string ='';
  editingListId: string | null= null;
  editedListName: string ='';

  constructor( private listService: ListService,
               private taskService : TaskService,
               private router: Router) {}
  randomColorIndex = 0;

  ngOnInit(): void {
    this.updateLists();
  }
//Si le tableau lists change (par exemple, après une requête HTTP), on refait le updateLists() pour réappliquer les couleurs.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lists']) {
      console.log("Task lists on change:", this.lists);
      this.updateLists();
    }
  }

  updateLists(): void {
    if (this.lists) {
      this.lists.forEach((item) => {
        item.cssClass = this.getBoxColor();
      });
    }
  }

  getBoxColor(): string {
    const colors = this.createBoxColors();
    const color = colors[this.randomColorIndex];
    this.randomColorIndex = (this.randomColorIndex + 1) % colors.length;
    return `square square-${color}`;
  }

  createBoxColors(): string[] {
    return ['red', 'green', 'orange', 'blue'];
  }

  onSelectList(list: TaskList): void {
  this.selectList.emit(list);
  }

  addList(): void {
    if(!this.newListName.trim()) return;
      
const newList: TaskList = 
{  name: this.newListName } as TaskList;
  console.log("list envoyée au backend :", newList); 

  this.listService.addList(newList).subscribe((createdList) => {
    this.lists.push(createdList); // ajoute dans la liste locale
    this.updateLists(); // réapplique les couleurs
    this.newListName = '';
  });
  }

startEdit(list: TaskList): void {
  this.editingListId = list._id || null;
  this.editedListName = list.name;
}
 confirmEdit(): void {
  if (!this.editingListId || !this.editedListName.trim()) return;

  const updatedList: TaskList = {
    _id: this.editingListId,
    name: this.editedListName
  };

  this.listService.updateList(updatedList).subscribe((res) => {
    const index = this.lists.findIndex((l) => l._id === this.editingListId);
    if (index !==-1 ) this.lists[index].name = this.editedListName; 
    this.editingListId = null;
    this.editedListName = '';
  });
}

cancelEdit(): void {
   this.editingListId = null;
    this.editedListName = '';
}

deleteList(_id: string): void {
  if (!confirm("Voulez-vous supprimer cette liste ?")) return;

  this.listService.deleteList(_id).subscribe(() => {
    this.lists = this.lists.filter((l) =>l._id !== _id);
  });
}


displayTask(list: TaskList): void {
  if (!list.tasks) {
    this.taskService.getTasksByListId(list._id!).subscribe((tasks: Task[]) => {
      console.log("Tâches récupérées pour la liste :", list.name, tasks); // 👈 LOG
      list.tasks = tasks;
      list.showTasks = true;
    });
  } else {
    list.showTasks = !list.showTasks;
  }
}

getTaskStatus(task: Task): string {
  if (task.completed === true) return 'Terminé';
  if (task.completed === false) return 'À faire';
  return 'En cours'; // ou selon ton système de statuts
}

hasTasks(list: TaskList): boolean {
  return !!list.tasks && list.tasks.length > 0;
}





}

/**
 Que signifie !! en JavaScript/TypeScript ?
Les deux points d'exclamation (!!) servent à convertir une valeur en un booléen explicite (true ou false).
✅ Pourquoi !! ?
Voici ce que fait !!list.tasks :
Le premier !list.tasks transforme la valeur en falsey (undefined → true, donc !undefined = true).
Le deuxième ! inverse à nouveau → on obtient un vrai booléen.
 */