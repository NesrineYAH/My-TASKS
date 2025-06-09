import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTaskComponent } from '../../pages/new-task/new-task.component';


@Component({
  selector: 'app-header',
    standalone: true,
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
