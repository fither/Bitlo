import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (true) { // e.g. if token exists, otherwise use incomming request.
        return next.handle(req.clone({
            setHeaders: {
                'AuthenticationToken': localStorage.getItem('TOKEN'),
                'Tenant': localStorage.getItem('TENANT')
            }
        }));
    }
    else {
        return next.handle(req);
    }
  }
}