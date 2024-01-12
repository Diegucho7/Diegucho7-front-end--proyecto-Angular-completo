import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';
import { Observable, of } from 'rxjs';

import { User } from '../interfaces/user-interface';
import { AuthStatus } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject( HttpClient );

  private _currentuser = signal<User|null> (null);
  private _authStatus = signal <AuthStatus>(AuthStatus.checking);


  constructor() { }

  login (email:string, password:string): Observable<boolean>{

    return of(true);
  }

}
