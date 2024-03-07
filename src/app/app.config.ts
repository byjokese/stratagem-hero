import { ApplicationConfig, ɵprovideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideGoogleAnalytics, provideGoogleAnalyticsRouter } from '@hakimio/ngx-google-analytics';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), ɵprovideZonelessChangeDetection(), provideGoogleAnalytics('G-TSSND103ME'), provideGoogleAnalyticsRouter()],
};
