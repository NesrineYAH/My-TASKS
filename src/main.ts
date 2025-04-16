import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { provideHttpClient } from '@angular/common/http';
//import { provideRouter } from '@angular/router';

registerLocaleData(fr.default);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),

  ]
}).catch(err => console.error(err));

