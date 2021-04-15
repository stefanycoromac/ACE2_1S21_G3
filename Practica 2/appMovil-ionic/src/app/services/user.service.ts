import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Global } from 'src/app/services/global';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/user`;
  }

  public async authenticate(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(
      `${this.url}/login`,
      json,
      { headers }
    ).toPromise();
  }

  public async signup(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(
      `${this.url}/register`,
      json,
      { headers }
    ).toPromise();
  }

  public async get(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}`).toPromise();
  }

  public async update(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.put(
      `${this.url}`,
      json,
      { headers }
    ).toPromise();
  }
}
