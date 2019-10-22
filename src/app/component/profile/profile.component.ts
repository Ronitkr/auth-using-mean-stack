import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object[];
  

  constructor(private api: AuthService, route: Router) { }

  ngOnInit() {
    this.api.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
    },
     err => {
       console.log(err);
       return false;
     });
  }
  
  
}
