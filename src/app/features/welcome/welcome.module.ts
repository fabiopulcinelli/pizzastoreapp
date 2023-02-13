import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WelcomeComponent} from './welcome.component';
import {RouterModule, Routes} from '@angular/router';
import {MaterialModule} from 'src/app/shared/material/material.module';
import {SharedModule} from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
];

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule
  ]
})
export class WelcomeModule {
}
