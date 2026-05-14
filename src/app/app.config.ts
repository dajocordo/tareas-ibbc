import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http'; // <-- Asegúrate de incluir withFetch aquí
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { registerLocaleData } from '@angular/common';
import localeEsSV from '@angular/common/locales/es-SV'; // Locale específico de El Salvador
registerLocaleData(localeEsSV);


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOCALE_ID, useValue: 'es-SV' },
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false // <--- ¡Esto apaga el modo oscuro automático!
        }
      }
    })
  ]
};




// En tus Providers:
providers: [
]


