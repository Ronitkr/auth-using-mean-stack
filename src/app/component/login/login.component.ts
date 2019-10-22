import { Component, OnInit, NgZone } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;

  username: String;
  password: String;

  constructor(
    private errMsg: FlashMessagesService, 
    private api: AuthService, 
    private route: Router, 
    ngZone: NgZone
    ) { }

  ngOnInit() {
  }

  onLogin(){
    const user = {
      username: this.username,
      password: this.password
    }
    
    this.api.loginAuthService(user).subscribe(data =>{
      if(data.success){
        this.api.storeToken(data.token, data.user);
        this.errMsg.show('You are logged In', {cssClass: 'alert-success', timeout: 5000});
        this.route.navigateByUrl('/dashboard');  
      }else{
        this.errMsg.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.route.navigateByUrl('/login'); 
      }
      
    })
  }
}
