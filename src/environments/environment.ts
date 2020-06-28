// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as firebase from 'firebase/app';

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAxW88uMlTZTXOmJFsD02grpecR0y2r5s0',
    authDomain: 'ng-art.firebaseapp.com',
    databaseURL: 'https://ng-art.firebaseio.com',
    projectId: 'ng-art',
    storageBucket: 'ng-art.appspot.com',
    messagingSenderId: '285216813618',
    // appId: "app-id",
    // measurementId: "G-measurement-id",
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
