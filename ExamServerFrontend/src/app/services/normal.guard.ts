import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const normalGuard: CanActivateFn = (route, state) => {
  
  
  
  let loginserviceobj:LoginService=inject(LoginService);
  let router:Router =inject(Router);
  if(loginserviceobj.isLoggedIn() && loginserviceobj.getUserRole()=='NORMAL')
  {
    return true;
  }
  router.navigate(['login']);


 
  return false;
  //return true;
};
