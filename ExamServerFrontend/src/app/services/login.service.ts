import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  //basically ham is ko isliye bana rahe hai kyu ki jab ham login kar rahe hai tab ye login ke just bad normal ya damin dashboard pe pahuchane ke bad o login register change nahi ho raha hai
  // is ko jo jo subscribe karege o o event apane ap se call ho jayege 
  public loginStatusSubject=new Subject<boolean>();

  constructor(private httpclient:HttpClient ) { }


  //get currentUser--ye o user return karega jisne geneate token karate time login passward diya tha
  public getCurrentUser()
  {
    return this.httpclient.get(`${baseUrl}/current-user`);
  }


  //generate token
  public generateToken(loginData:any)
  {
    return this.httpclient.post(`${baseUrl}/generate-token`,loginData)

  }
  //login user : set token in local strorage (in local storage me agar koi data hai to  browser band kar de to bhi data rahata hai )
  public loginUser(token:any)
  {
    localStorage.setItem("token",token);
    //this.loginStatusSubject.next(true);
    return true;
  }

  //is login==ye function check karega ki user login hai ya nahi basically localstorage ke token ko check karega agar token hai to hai login nahi to nahi login hai
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr==''|| tokenStr==null)
    {
      return false;
    }
    else{
      return true;
    }

  }

  //logout-- remove tokn from local storage
  public logout()
  {
    localStorage.removeItem("token");
    return true;
  }
  //gettoken-this will return token stored in localstorage

  public getToken()
  {
    console.log("inside get tooken method"+localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  //ye method ham isliye bana rahe hai kyu ki ham chahate hai ki ek bar user ki details ham local storage me save kar le
  //jis se hame user details jab chahiye to tab bar bar backend ko call na lagaye yahi se user mil jaye jo login hai
  // this is not safe when user ke pass kuch sensitive info hai to 

  public setUser(user:any)
  {
    localStorage.setItem("user",JSON.stringify(user));
  }
  //getuser-this will get user from local storage

  public getUser()
  {
    let userStr=localStorage.getItem("user");
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    else{
      this.logout();
      return null;
    }
  }

  //get user role

  public getUserRole()
  {
    let user =this.getUser();
    //is se hame ek hi role milega agar hamare application me more than one role hai to list bana ke return kare
    return user.authorities[0].authority;
  }


}
