import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './app-auth/auth.guard';
import { LoginComponent } from './shared/login/login.component';
import { MainComponent } from './shared/main/main.component';
import { SearchMainComponent } from './app-edit/components/search-main/search-main.component';

const defaultRoute = 'collaborators/edit';

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
        path: 'edit',
        component: SearchMainComponent
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
