import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, OnDestroy {
  public menuItem: any[];
  public now: Number;

  private subscription: Subscription;

  constructor(private sidebarService: SidebarService) {
    this.menuItem = sidebarService.menu;
    this.now = Date.now();
  }

  ngOnInit(): void {

    const source = interval(30000);
    this.subscription = source.subscribe(() => {
      this.now = Date.now();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  logOut() {
    localStorage.clear();
  }
}
