import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


 if(navigator.serviceWorker.controller){
      console.log('[SW] aktiviran, ni potrebne ponovne registracije')
    }
    else{
      navigator.serviceWorker.register('pwabuilder-sw.js',{
        scope:"./"
      }).then(function(reg){
        console.log('[SW] uspesno registriran' + reg.scope);
      });
    }