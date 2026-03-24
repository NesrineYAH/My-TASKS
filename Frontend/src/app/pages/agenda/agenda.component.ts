import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarView,
  CalendarEvent,
  CalendarModule,
  DateAdapter,
} from 'angular-calendar';
//import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { startOfDay } from 'date-fns';


@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [
    CommonModule, CalendarModule
    //CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  CalendarView = CalendarView;

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date('2025-04-27')),
      title: 'Envoyer le rapport',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' },
    },
    {
      start: startOfDay(new Date('2025-04-29')),
      title: 'Mon workflow',
      color: { primary: '#e3bc08', secondary: '#FDF1BA' },
    }
  ];
}
