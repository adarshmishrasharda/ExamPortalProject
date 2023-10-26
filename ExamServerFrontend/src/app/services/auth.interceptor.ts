import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";




@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginservice:LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {
    
    let authReq=req;
    const token1=this.loginservice.getToken();
    console.log("inside interceptor");
    console.log("token 1 is sis sis sis"+token1);
    if(token1!=null)
    {
        console.log("going to add token in header interceptor");

        authReq=authReq.clone({setHeaders:{Authorization: `Bearer ${token1}`}});

    }
    return next.handle(authReq);

}
}

export const authInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
]