import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const afsModules = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule.enablePersistence(),
];

@NgModule({
  imports: [afsModules],
  exports: [afsModules]
})
export class AfsModule { }
