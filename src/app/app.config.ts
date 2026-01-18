import { ApplicationConfig, provideBrowserGlobalErrorListeners, inject } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';

import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { DEFAULT_DATE_FORMAT } from './shared/utils/date-format';

export const appConfig: ApplicationConfig = {
  providers: [
    provideLuxonDateAdapter(DEFAULT_DATE_FORMAT),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideHttpClient(), provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        link: httpLink.create({
          uri: 'http://localhost:3000/graphql',
        }),
        cache: new InMemoryCache(),
      };
    })
  ]
};
