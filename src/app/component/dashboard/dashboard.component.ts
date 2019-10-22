import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private errMsg: FlashMessagesService, 
    private api: AuthService, 
    private route: Router, 
  ) { }

  ngOnInit() {
  }

  onLogout(){
    this.api.logout();
    this.errMsg.show("You'r successfully logged out", {cssClass: 'alert-success', timeout: 3000});
    this.route.navigate(['/login']);
    return false;
  }

}
