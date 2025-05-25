import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes} from "./app.routes";
import { provideHttpClient } from '@angular/common/http';
import { DateAdapter  } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
   {
      provide: DateAdapter,
      useFactory: adapterFactory,
    }
  ]
};
