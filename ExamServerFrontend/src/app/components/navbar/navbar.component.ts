import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  isUserLoggedIn=false;
  user:any=null;

  constructor(public login:LoginService){

  }

  ngOnInit():void{
    this.isUserLoggedIn=this.login.isLoggedIn();
    this.user=this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe(data=>{
      this.isUserLoggedIn=this.login.isLoggedIn();
      this.user=this.login.getUser();
    });

    console.log("user is sis is user",this.user.username);
  }


  public logout()
  {
    this.login.logout();
   
    window.location.reload();

    //ye kar ke bhi ham kar skate hai but is me problem ye aa rahi hai ki guard nahi kar raha hai
    //see one ki gaurd ko program se kaise chalayege ---agar program se gaurd kar gaya to ham neeche vale ko bhi use kar lege 
    //this.login.loginStatusSubject.next(false);
  }

}
