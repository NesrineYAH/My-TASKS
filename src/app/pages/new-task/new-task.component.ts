import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { ChangeDetectorRef, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskList } from '../../models/task-list.model';
import { ListService } from '../../services/List.service';
import { error } from 'console';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [CommonModule,  FormsModule ],
  templateUrl: './new-task.component.html',
  styleUrl:'./new-task.component.scss'
})
export class NewTaskComponent implements OnInit  {
  @Input()   lists: TaskList[] = [];

  task: Partial<Task> = {
    title: '',
    description: '',
    category: '',
    status: 'todo',
  priority: 'medium',
    dueDate: undefined,
    listId: undefined

  };
constructor(private taskService: TaskService, 
            private ListService: ListService,
            private cdr: ChangeDetectorRef,
            private dialogRef: MatDialogRef<NewTaskComponent>,
            @Inject(MAT_DIALOG_DATA) public data: { listId?: string }
 ) {
  this.task.listId = data?.listId;
  console.log('NewTaskComponent chargé !');
}

ngOnInit(): void {
  this.ListService.getLists().subscribe({
    next: (data) => {
      this.lists = data;
      console.log('Listes chargées:', this.lists);
    },
    error: (err) => console.error('Erreur lors du chargement des listes', err),
  });
}

onSubmit() {
  this.cdr.detectChanges();
  const newTask: Task = {
    ...this.task,
    createdAt: new Date(),
    updatedAt: new Date(), 
   // listId: 'listId'  // ⛔  ici c'etait le probleme d'ajout tasks 400 
  } as Task;

this.taskService.addTask(newTask as Task).subscribe(() => {
  this.task = { title: '', status: 'todo', priority: 'medium', listId: 'listId'}; // Reset form
  this.dialogRef.close('refresh'); // ✅ indique au parent de recharger
});
};
close(): void {
  this.dialogRef.close();
}
}
