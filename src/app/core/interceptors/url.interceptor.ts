import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      request.url.startsWith('http://') ||
      request.url.startsWith('https://') ||
      request.url.startsWith('assets')
    ) {
      return next.handle(request);
    }

    const clonedRequest = request.clone({
      url: `${environment.apiUrl}${request.url}`,
    });

    return next.handle(clonedRequest);
  }
}
