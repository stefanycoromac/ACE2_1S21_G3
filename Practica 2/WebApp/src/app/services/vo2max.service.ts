import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class Vo2maxService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/vo2max`;
  }

  public async get(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}`).toPromise();
  }

  public async getSpecific(idUser: number, idVO2MAX: number): Promise<any> {
    return await this._httpClient
      .get(`${this.url}/${idUser}/last/${idVO2MAX}`)
      .toPromise();
  }

  public async getLast(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/last`).toPromise();
  }
}
