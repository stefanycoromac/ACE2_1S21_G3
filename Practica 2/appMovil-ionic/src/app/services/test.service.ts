import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Global } from 'src/app/services/global';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${Global.url}/test`;
  }
}
