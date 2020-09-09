// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCOdc6oDkNo2SgoE_8HYFGywTwisI_Mu9c",
    authDomain: "nichelia.firebaseapp.com",
    databaseURL: "https://nichelia.firebaseio.com",
    projectId: "nichelia",
    storageBucket: "nichelia.appspot.com",
    messagingSenderId: "202359763614",
    appId: "1:202359763614:web:5479a86c850c8061e6018f",
    measurementId: "G-S1F3T5HK4G"
  }
};

export function firebaseAppNameFactory() {
  return environment.firebase.projectId;
};

export const authRoute = 'auth';
export const unauthorisedRoute = '403';
export const authorisedRoute = 'home';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
