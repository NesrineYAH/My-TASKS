import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
//import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
//@Input() text: string =  'Cliquez-moi je suis un boutton';
//@Input() color: string = 'blue';
@Output() btnClick = new EventEmitter<void>();

text: string = 'Cliquez-moi je suis un boutton';
color: string = 'blue';
constructor() {}

ngOnInit(): void {}

onClick() {
  alert('Bouton bien cliqué !');
  this.btnClick.emit();
 this.color = this.color === 'blue' ? 'green' : 'blue'; 
}
}
