import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AngularFireModule} from '@Angular/fire';
import {AngularFireDatabaseModule } from '@Angular/fire/database';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

export var firebaseConfig = {
  apiKey: "AIzaSyAgALJyYlp2Ccr7JzPzb2VUrdQo9M8xfJU",
  authDomain: "todo-gl-3a646.firebaseapp.com",
  projectId: "todo-gl-3a646",
  storageBucket: "todo-gl-3a646.appspot.com",
  messagingSenderId: "485228983365",
  appId: "1:485228983365:web:482087862e573078dd5f2c"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
