import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  uri = 'http://localhost:5000/api';
  token;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  login( email: string, name: string) {
    this.http.post(this.uri + '/authenticate',{email: email, name: name})
      .subscribe((resp: any) => {
        this.router.navigate(['profile']);
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('refresh_token', resp.refreshToken);
    })
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('token') !== null);
  }

  getJwtToken() {
    return "refreshToken";
  }

  refreshToken():Observable<any> {
    return null;
  }
}

