import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
  public menuItem: any[];

  constructor(private sidebarService: SidebarService) {
    this.menuItem = sidebarService.menu;
  }

  ngOnInit(): void {
  }
}
