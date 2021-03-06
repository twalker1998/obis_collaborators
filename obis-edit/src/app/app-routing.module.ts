import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMainComponent } from './app-edit/components/edit-main/edit-main.component';
import { LoginComponent } from './shared/login/login.component';
import { MainComponent } from './shared/main/main.component';
import { ResultComponent } from './app-edit/components/result/result.component';

import { AuthGuard } from './app-auth/auth.guard';

const defaultRoute = 'collaborators/main';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: defaultRoute
  },
  {
    path: 'collaborators',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'main',
        component: EditMainComponent,
        children: [
          {
            path: 'result/:acode',
            component: ResultComponent,
            outlet: 'result'
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
