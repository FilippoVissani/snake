import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {SnakeComponent} from './snake-game/snake-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    SnakeComponent
  ]
})
export class AppModule {}
