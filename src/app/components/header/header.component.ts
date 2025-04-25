import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTaskComponent } from '../../pages/new-task/new-task.component';


@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
title: string = 'Task Tracker';


constructor(private dialog: MatDialog) {}

openDialog(): void {
  const dialogRef = this.dialog.open(NewTaskComponent, {
    width: '500px',
    disableClose: false // peut être true si tu veux forcer la fermeture avec un bouton
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('Modale fermée');
    // Tu peux rafraîchir la liste ici si besoin
  });
}


}
