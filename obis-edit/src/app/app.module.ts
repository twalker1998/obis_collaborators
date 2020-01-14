import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppAuthModule } from './app-auth/app-auth.module';
import { AppEditModule } from './app-edit/app-edit.module';
import { SharedModule } from './shared/shared.module';
import { jwtInterceptorProvider } from './app-auth/jwt.interceptor';
import { errorInterceptorProvider } from './app-auth/errors.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    AppAuthModule,
    AppEditModule
  ],
  providers: [jwtInterceptorProvider, errorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
