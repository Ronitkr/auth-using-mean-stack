import { Component, OnInit, NgZone } from '@angular/core';
import { ValidateService } from 'src/app/service/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  name: String;
  email: String;
  username: String;
  password: String;


  constructor(
    private validate: ValidateService, 
    private errMsg: FlashMessagesService,
    private authApi: AuthService,
    private route: Router,
    private ngZone: NgZone
    ) { }

  ngOnInit() {
  }

  onRegister(){
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    //user register validate
    if(!this.validate.validateRegister(user)){
      this.errMsg.show('Please provide input field', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    //email validate
    if(!this.validate.validateEmail(user.email)){
      this.errMsg.show('Please enter the valid email..', { cssClass: 'alert-danger', timeout: 5000 });
      return false;
    }

    //register user
    this.authApi.registerService(user).subscribe(data=>{
      if(data.success){
        // this.errMsg.show('successfully submit', { cssClass: 'alert-success', timeout: 5000 });
        this.ngZone.run(() => this.route.navigateByUrl('/login'))     
      }else{
        this.errMsg.show('Failed to submit', { cssClass: 'alert-warning', timeout: 5000 });
      }
    })
  }
}
