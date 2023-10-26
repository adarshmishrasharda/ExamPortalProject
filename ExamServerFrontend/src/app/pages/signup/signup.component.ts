import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private userService:UserService,
    private matsnackbar:MatSnackBar
  ){}

  
  /* here below we defined user for data binding karane ke liye
   field ke sath jo hamne html me define kiya hai ham is  ke alava bhi bahut sare method hai ye karane ke liye 
   jaise ham ek interface bana le ais keliye aur us ka object use kare */
  
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }


  formSubmit()
  {
    //alert("submit");
    if(this.user.username=='' || this.user.username==null)
    {
      //alert('user is required');
      this.matsnackbar.open("Username is required",'',{
        duration:3000
       // verticalPosition:'top',
        //horizontalPosition:'right'

      });
      return;
    }

    if(this.user.password=='' || this.user.password==null)
    {
      alert('password is required');
      return;
    }
    if(this.user.firstName=='' || this.user.firstName==null)
    {
      alert('firtsname is required');
      return;
    }
    if(this.user.lastName=='' || this.user.lastName==null)
    {
      alert('lastname is required');
      return;
    }
    if(this.user.email=='' || this.user.email==null)
    {
      alert('email is required');
      return;
    }
    if(this.user.phone=='' || this.user.phone==null)
    {
      alert('phone is required');
      return;
    }

    //so ab hame yaha pe backend API call karani hai jis se data backend me ja ke save ho jaye
    //is ke liye code ham yaha nahi likhege ham api call ke liye alag se APi servicebayege us ke uaha se call karege

    //adduser function call from userservice to save data in backend

    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        //alert("success data get saved");
        Swal.fire('Success','User Registered Successfully','success');
        
      },
      (error)=>{
        //error
        console.log(error);
        //alert("error data get saved");
        this.matsnackbar.open('something went wrong !!','',{
        duration:3000
        })


      }
    )


  }

}
