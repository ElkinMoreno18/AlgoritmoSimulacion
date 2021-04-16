import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ArribayabajoComponent } from './arribayabajo/arribayabajo.component';
import { ArrabmediaComponent } from './arrabmedia/arrabmedia.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    AppComponent,
    ArribayabajoComponent,
    ArrabmediaComponent,
    PrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
