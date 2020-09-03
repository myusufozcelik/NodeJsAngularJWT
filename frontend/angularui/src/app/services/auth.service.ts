import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {RegisterUser} from '../register/registerUser';
import {LoginUser} from '../login/loginUser'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  path= environment.path;

  TOKEN_KEY = "token" // ismi token olan token_key
  
  register(registerUser: RegisterUser) {
     let headers = new HttpHeaders()
     headers = headers.append("Content-Type","application/json")
     // datayı json formatında gönderdiğimizi söylüyoruz
     // headers datasına headersı gönderiyoruz.
     this.http.post(`${this.path}/user/register`,registerUser,{headers:headers})
    .subscribe(data=> {
      alert(data) // subscribe işlemini burada da yapabiliriz ts kısmında da
    })
    }

    login(loginUser:LoginUser) {
      let headers = new HttpHeaders()
      headers = headers.append("Content-Type","application/json")
      this.http.post(`${this.path}/user/login`,
      loginUser,{headers:headers}).subscribe(data=> {
        this.saveToken(data['token'])
      })

    }
    // gelen tokeni kaydedip local storage de tutalım
    saveToken(token) {
        localStorage.setItem(this.TOKEN_KEY,token)
    }

    // logOut olduğumuzda tokenı silmemiz gerekli
    logOut() {
      localStorage.removeItem(this.TOKEN_KEY)
    }

    // kişi giriş yapmış mı? 
    get isAuthenticated() { // !! anlamı true veya false döndürmesini sağlar
        return !!localStorage.getItem(this.TOKEN_KEY) 
        // varsa true, yoksa false döner
    }

    // token değerine ulaşmak için
    get token() {
        return localStorage.getItem(this.TOKEN_KEY)
    }

}
