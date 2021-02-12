import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _menu: any[];

  constructor() {
  }

  get menu(): any[] {
    this._menu = [
      { title: 'Inicio', icon: 'home', url: '/' },
      { title: 'Perfil', icon: 'accessibility_new', url: 'profile' },
      { title: 'Oxigeno', icon: 'air', url: 'oxygen' },
      { title: 'Temperatura', icon: 'thermostat', url: 'temperature' },
      { title: 'Ritmo Cardiaco', icon: 'favorite', url: 'heart' },
    ];

    return this._menu;
  }
}
