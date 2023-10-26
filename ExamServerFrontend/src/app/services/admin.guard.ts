import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';
import { inject } from '@angular/core';



export const adminGuard: CanActivateFn = (route, state) => {
 
  let loginserviceobj:LoginService=inject(LoginService);
  let router:Router =inject(Router);
  if(loginserviceobj.isLoggedIn() && loginserviceobj.getUserRole()=='ADMIN')
  {
    return true;
  }
  router.navigate(['login']);


 
  return false;
};
