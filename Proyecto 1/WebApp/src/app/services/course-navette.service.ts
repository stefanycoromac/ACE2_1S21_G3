import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class CourseNavetteService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/course-navette`;
  }

  public async getLast(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/${idUser}/last`).toPromise();
  }

  public async getDetail(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/detail/${idUser}/last`).toPromise();
  }

  public async getAll(idUser: number): Promise<any> {
    return await this._httpClient.get(`${this.url}/all/${idUser}`).toPromise();
  }

  public async getByID(idUser: number, status: String): Promise<any> {
    const json = JSON.stringify({ estado: status });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(`${this.url}/all/${idUser}`, json, { headers: headers }).toPromise();
  }
}
