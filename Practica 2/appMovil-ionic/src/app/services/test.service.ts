import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/test`;
  }

  public async create(idUser: number): Promise<any> {
    const json = JSON.stringify({ idUsuario: idUser });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(
      this.url, json, { headers }
    ).toPromise();
  }

  public async get(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/last`).toPromise();
  }
}
