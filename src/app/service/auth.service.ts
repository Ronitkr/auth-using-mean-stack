import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
// import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  
  constructor(private http: HttpClient) { }

  registerService(user): Observable<any>{
    let Api_url = 'http://localhost:3000/users/register';
    let headers = new HttpHeaders();
    // headers.append('Authorization', this.authToken);
    headers.set('Content-Type', 'application/json');
    return this.http.post(Api_url, user, {headers: headers})
              .pipe(
                map((res: Response) => {
                  return res || {}
                }),
              )
      
  }

  loginAuthService(user): Observable<any>{
    let Api_url = 'http://localhost:3000/users/authenticate';
    let headers = new HttpHeaders();
    // headers.append('Authorization', this.authToken);
    headers.set('Content-Type', 'application/json');
    return this.http.post(Api_url, user, {headers: headers})
                    .pipe(
                      map((res: Response) => {
                        return res || {}
             }),
        )
    }

  storeToken(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }  

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


  getProfile():Observable<any>{
    let Api_url = 'http://localhost:3000/users/profile';
    this.loadToken();
    let headers = new HttpHeaders().set('Authorization', this.authToken);
    return this.http.get(Api_url, {headers: headers})
                    .pipe(
                      map((res: Response) => {
                        return res || {}
             }),
        )
    }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  } 
  
  loggedIn() {
      if(this.getJwtToken()){
        return true;
      }
  }

  getJwtToken() {
    return localStorage.getItem('id_token');
  }
  
}
