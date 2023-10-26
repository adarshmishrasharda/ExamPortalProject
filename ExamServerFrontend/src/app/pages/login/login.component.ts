import { Component } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private matsnackbar:MatSnackBar
    ,private loginServiceObj:LoginService,
    private router:Router ){}

  
  public loginData={
    username:'',
    password:'',
  }


  formSubmit(){

    console.log(this.loginData.username);
    console.log("login button clicked data data");
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      //alert('user is required');
      this.matsnackbar.open("Username is required",'',{
        duration:3000
       // verticalPosition:'top',
        //horizontalPosition:'right'

      });
      return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      //alert('user is required');
      this.matsnackbar.open("Password is required",'',{
        duration:3000
       // verticalPosition:'top',
        //horizontalPosition:'right'

      });
      return;
    }

    //request server to generate token
    this.loginServiceObj.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log("success");
        console.log(data);
        //login...
        this.loginServiceObj.loginUser(data.token);

        this.loginServiceObj.getCurrentUser().subscribe(

          (user:any)=>
          {
            this.loginServiceObj.setUser(user);
            console.log(user);
            //redirect yaha se ab kar skate hai kyu ki login ho gaya hai/
            //agar admin hai role to admin vale dashboard pe other wise nornal vale dashboard
            //redirect......Normal:Normal-dashboard
            //redirect......admin:admin-dashboard
            if(this.loginServiceObj.getUserRole()=="ADMIN")
            {
              //admin dashboard
              //basically ye redirect karega matlab ye sare component ko reload kar dega
              //window.location.href='/admin'
               //now this wil not reload component
              this.router.navigate(['admin']);
              this.loginServiceObj.loginStatusSubject.next(true);

            }
            else if(this.loginServiceObj.getUserRole()=="NORMAL")
            {
              //Normal user dashboard
              //basically ye redirect karega matlab ye sare component ko reload kar dega
              //window.location.href='/user-dashboard';

              //now this wil not reload component
              this.router.navigate(['user-dashboard']);
              this.loginServiceObj.loginStatusSubject.next(true);


            }
            else{
              this.loginServiceObj.logout();
            }

          },

        );
      },
      (error)=>{
        console.log("error");
        console.log(error);
        this.matsnackbar.open("Invalid details !! Try Again",'',{duration:3000});
      }
    )

    

  }

}
