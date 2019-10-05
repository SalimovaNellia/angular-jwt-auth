import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URI = 'http://localhost:5000/api';

  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login( email: string, name: string) {
    this.http.post(this.URI + '/authenticate',{email: email, name: name})
      .subscribe((resp: any) => {
        this.router.navigate(['profile']);
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('refresh_token', resp.refreshToken);
        this.currentTokenSubject.next(resp.token);
    })
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    this.currentTokenSubject.next(null);
  }

  getJwtToken() {
    return localStorage.getItem('auth_token');
  }

  refreshToken():Observable<any> {
    return null;
  }
}

