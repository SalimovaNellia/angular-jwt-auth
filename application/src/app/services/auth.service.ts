import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {BehaviorSubject, Observable, of} from "rxjs";
import {tap} from "rxjs/operators";
import {Tokens} from "../model/tokens";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URI = 'http://localhost:5000/api';

  private currentTokenSubject: BehaviorSubject<string>;
  public currentToken: Observable<string>;

  constructor(private http: HttpClient,
              private router: Router) {
    this.currentTokenSubject = new BehaviorSubject<string>(localStorage.getItem('auth_token'));
    this.currentToken = this.currentTokenSubject.asObservable();
  }

  public get currentTokenValue(): string {
    return this.currentTokenSubject.value;
  }

  login( email: string, name: string) {
    this.http.post(this.URI + '/authenticate',{email: email, name: name})
      .subscribe((resp: any) => {
        this.router.navigate(['profile']);
        let tokens = {
          accessToken: resp.token,
          refreshToken: resp.refreshToken
        };
        this.storeTokens(tokens);
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

  refreshTokens():Observable<Tokens> {
    return this.http.post<any>(this.URI + '/refresh', {
      'refresh_token': this.getRefreshToken()
    }).pipe(tap((tokens: Tokens) => {
      this.storeTokens(tokens);
    }));
  }

  private storeTokens(tokens: Tokens) {
    localStorage.setItem('auth_token', tokens.accessToken);
    localStorage.setItem('refresh_token', tokens.refreshToken);
  }

  private getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}

