import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Global } from 'src/app/services/global';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = Global.url;
  }

  public async authenticate(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(
      `${this.url}/user/login`,
      json,
      { headers: headers }
    ).toPromise();
  }
}
