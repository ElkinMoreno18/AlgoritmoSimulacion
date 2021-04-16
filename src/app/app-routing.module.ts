import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArribayabajoComponent } from './arribayabajo/arribayabajo.component'
import { ArrabmediaComponent } from './arrabmedia/arrabmedia.component'
import { PrincipalComponent } from './principal/principal.component'

const routes: Routes = [
  { path: '', component: PrincipalComponent},
  { path: 'arribaabajo', component: ArribayabajoComponent },
  { path: 'arrabmedia', component: ArrabmediaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
