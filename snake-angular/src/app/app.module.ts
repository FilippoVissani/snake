import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SnakeGameComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    SnakeGameComponent
  ]
})
export class AppModule {}
