import { Component, OnInit } from '@angular/core';
import { FirebaseAuth } from 'angularfire2';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor( public authService: AuthService ) { }

  ngOnInit() {
  }
}
