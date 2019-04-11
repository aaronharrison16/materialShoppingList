import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor( public authService: AuthService) { }

  ngOnInit() {
  }

  onSignIn() {
    this.authService.doGoogleLogin()
  }
}