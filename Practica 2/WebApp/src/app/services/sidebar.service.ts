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
      { title: 'VO2MAX', icon: 'health_and_safety', url: 'vo2max' },
      { title: 'Oxigeno', icon: 'air', url: 'oxygen' },
      { title: 'Temperatura', icon: 'thermostat', url: 'temperature' },
      { title: 'Ritmo Cardiaco', icon: 'favorite', url: 'heart-rate' },
      { title: 'Course-Navette', icon: 'directions_run', url: 'course-navette' },
    ];

    return this._menu;
  }
}
