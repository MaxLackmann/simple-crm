import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simplecrm-5630d',
        appId: '1:1007819771006:web:4cdf29d6111a9662489c2f',
        storageBucket: 'simplecrm-5630d.appspot.com',
        apiKey: 'AIzaSyBZgBNv8xWzDuQJUF-AzjVFvKrQV8tyWyI',
        authDomain: 'simplecrm-5630d.firebaseapp.com',
        messagingSenderId: '1007819771006',
      })
    ),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
  ],
};
