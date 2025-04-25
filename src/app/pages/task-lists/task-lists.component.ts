import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskList } from '../../models/task-list.model';


@Component({
  selector: 'app-task-lists',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-lists.component.html',
  styleUrls: ['./task-lists.component.scss']
})
export class TaskListsComponent implements OnInit, OnChanges {
  @Input() lists: TaskList[] = [];
  @Output() selectList: EventEmitter<TaskList> = new EventEmitter<TaskList>();

  randomColorIndex = 0;

  ngOnInit(): void {
    console.log("Task lists on init:", this.lists);
    this.updateLists();
  }

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
}
