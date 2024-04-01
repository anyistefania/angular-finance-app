import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  
  @Injectable({
    providedIn: 'root',
  })
  export class AuthInterceptorService implements HttpInterceptor {
    constructor() {}
  
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      const token = localStorage.getItem('access-token') ?? '';
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return next.handle(req);
    }
  }
  