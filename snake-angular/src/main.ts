import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module'; // Make sure the path is correct


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
