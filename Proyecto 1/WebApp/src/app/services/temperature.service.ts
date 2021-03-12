import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/temperature`;
  }

  public async getTop(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/top`).toPromise();
  }

  public async getLast(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/last`).toPromise();
  }
}
