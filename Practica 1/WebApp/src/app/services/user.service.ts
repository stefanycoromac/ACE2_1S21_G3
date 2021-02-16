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
    this.url = `${Global.url}/user`;
  }

  public async authenticate(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(
      `${this.url}/login`,
      json,
      { headers: headers }
    ).toPromise();
  }

  public async getCoaching(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/coaching`).toPromise();
  }
}
