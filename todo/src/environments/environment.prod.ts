export const environment = {
  production: true,
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
