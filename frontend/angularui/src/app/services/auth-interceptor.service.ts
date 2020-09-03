import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }
  // injector; bir servisi başka bir serviste kullanmamızı sağlar
  intercept(request,next) {
    // yapacağımız auth. işlemini handle ile göndeririz.
    let authService = this.injector.get(AuthService);
    //AuthService ni authService değişkenine injekte ettik

    if(authService.isAuthenticated) {
      let authRequest = request.clone({ // her isteğin başına authorization ve değerini ekler
        headers : request.headers.set('authorization','token '+authService.token)
      })
      return next.handle(authRequest)
      // Sonuç olarak yapacağımız her isteğin başına token değerini koyarak yapıyoruz.
    }
    else {
      return next.handle(request)
    }

  }
}
