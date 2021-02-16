import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: User;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void { }
}
