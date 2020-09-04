import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { MatModule } from "./mat.module";
import { AfsModule } from "./afs.module";

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ThemeComponent } from './theme/theme.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { TodoComponent } from './todo/todo.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ThemeComponent,
    HomeComponent,
    MenuComponent,
    TodoComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DragDropModule,
    AppRoutingModule,
    MatModule,
    AfsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
