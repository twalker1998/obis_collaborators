import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginData {
  username: string;
  password: string;
}

export interface ApplicationUser {
  key: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<ApplicationUser>;
  private currentUser: Observable<ApplicationUser>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let loginData: LoginData = {
      username: username,
      password: password
    };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.httpClient.post<any>("https://obis.ou.edu/api/auth/login/", loginData, httpOptions).pipe(map(user => {
      if(user && user.key) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }

      return user;
    }));
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
