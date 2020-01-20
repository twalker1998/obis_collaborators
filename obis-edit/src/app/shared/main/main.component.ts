import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../app-auth/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private auth: AuthenticationService, private router: Router) { }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
