import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'acm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  constructor(private readonly router: Router) {}

  public isSignedIn() {
    return !!localStorage.getItem('token');
  }

  public signOut() {
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login');
  }

  public getMyId() {
    return localStorage.getItem('my_id');
  }
}
