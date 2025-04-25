import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/Task';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './new-task.component.html',
  styleUrl:'./new-task.component.scss'
})
export class NewTaskComponent {
  task: Partial<Task> = {
    title: '',
    description: '',
    status: 'todo',
  priority: 'medium',
    dueDate: undefined,
    listId: undefined

  };
constructor(private taskService: TaskService, 
            private cdr: ChangeDetectorRef,
            private dialogRef: MatDialogRef<NewTaskComponent>,
            @Inject(MAT_DIALOG_DATA) public data: { listId?: number }
 ) {
  this.task.listId = data?.listId;
  console.log('NewTaskComponent chargé !');
}
onSubmit() {
  this.cdr.detectChanges();
  const newTask: Task = {
    ...this.task,
    createdAt: new Date(),
    updatedAt: new Date()
  } as Task;

this.taskService.addTask(newTask as Task).subscribe(() => {
  this.task = { title: '', status: 'todo', priority: 'medium' }; // Reset form
  this.dialogRef.close('refresh'); // ✅ indique au parent de recharger
});
};
close(): void {
  this.dialogRef.close();
}
}
