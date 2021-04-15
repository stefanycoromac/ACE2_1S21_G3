import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  public user: User;
  public lastTest: Test;

  private subscription: Subscription;

  constructor(
    private _testService: TestService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.lastTest = new Test();
  }

  ngOnInit() {
    const source = interval(1500);
    this.subscription = source.subscribe(() => {
      this.getLast();
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private async getLast(): Promise<void> {
    try {
      const data = await this._testService.get(this.user.idUsuario);

      if (data['code'] === '200') {
        this.lastTest = data['data'];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }
}
