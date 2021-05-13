import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { SidebarService } from '../services/sidebar.service';

declare let App: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: [
    './pages.component.css'
  ]
})
export class PagesComponent implements OnInit, AfterViewInit, OnDestroy {
  public menuItem: any[];
  public now: number;

  private subscription: Subscription;

  constructor(_sidebarService: SidebarService) {
    this.menuItem = _sidebarService.menu;
    this.now = Date.now();
  }

  ngOnInit(): void {

    const source = interval(30000);
    this.subscription = source.subscribe(() => {
      this.now = Date.now();
    });
  }

  ngAfterViewInit(): void {
    App.init();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  logOut() {
    localStorage.clear();
  }
}
