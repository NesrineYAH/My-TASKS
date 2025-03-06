import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { provideHttpClient } from '@angular/common/http';


registerLocaleData(fr.default);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient()  // 👈 Ajoute ceci pour que `HttpClient` fonctionne
  ]
}).catch(err => console.error(err));

