import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class OxygenService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/oxygen`;
  }

  public async getTop(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/top`).toPromise();
  }

  public async getLast(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/last`).toPromise();
  }

  public async getDetail(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/detail/${idUser}/last`).toPromise();
  }
}
