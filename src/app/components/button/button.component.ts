import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
//@Input() text!: string;
//@Input() color!: string;
@Output() btnClick = new EventEmitter<void>();

text: string = 'Cliquez-moi';
color: string = 'blue';
constructor() {}

ngOnInit(): void {}

onClick() {
  alert('Bouton cliqué !');
  this.btnClick.emit();
 this.color = this.color === 'blue' ? 'green' : 'blue'; 
}
}
