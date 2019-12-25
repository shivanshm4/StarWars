import { NgModule } from '@angular/core';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';

const routes = [{path: 'create-character',
    component: CreateCharacterComponent
  }, {path: 'characters', component: TabsComponent, children: [{
      path: '', redirectTo: 'all', pathMatch: 'full'},
       { path: ':side', component: ListComponent }]},{ path: '**', redirectTo: '/characters'}];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{}
