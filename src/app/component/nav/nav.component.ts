import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private errMsg: FlashMessagesService, 
    public api: AuthService, 
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
