import { Injectable, inject, signal } from '@angular/core';
import {RegisterResponse, User} from  '../interfaces';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<User|null> (null);
  private _authStatus = signal <RegisterResponse>;
  constructor() { }

}
