import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';

import { User } from '../interfaces/user-interface';
import { AuthStatus, CheckTokenResponse, LoginResponse } from '../interfaces';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null> (null);
  private _authStatus = signal <AuthStatus>(AuthStatus.checking);

  // !Al mundoexterior

  public currentUser = computed( ()=> this._currentUser());
  public authStatus = computed( ()=> this._authStatus());

  constructor() { }

  private setAuthentication(user:User, token:string ):boolean{
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token', token);
    return true;
  }

  login (email:string, password:string): Observable<boolean>{

    const url = `${this.baseUrl}/auth/login`;
    const body = {email, password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map(({token, user})=> this.setAuthentication(user,token)),
      
        map( ()=>true),

        // TODO:Errores
        catchError(err =>  throwError(() => err.error.message))


      );
 

      

    }
    checkAuthStatus() :Observable<Boolean> {
       const url = `${this.baseUrl}/auth/check-token`;
       const token = localStorage.getItem('token');
       if (!token) return of(false);
      
       const headers = new HttpHeaders().
       set('Authorization',`Bearer ${token}`);

       return this.http.get<CheckTokenResponse>(url, {headers})
       .pipe( 
        map(({token, user})=> this.setAuthentication(user,token)),
        catchError( () => {
          this._authStatus.set(AuthStatus.notAuthenticated)
         return of(false);
        })
       )
    }

}
