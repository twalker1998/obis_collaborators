import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './app-auth/auth.guard';
import { LoginComponent } from './shared/login/login.component';
import { MainComponent } from './shared/main/main.component';
import { TestCompComponent } from './test/components/test-comp/test-comp.component';

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
        component: TestCompComponent
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
