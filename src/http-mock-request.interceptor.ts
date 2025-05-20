import {Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isDevMode } from '@angular/core';
import { environment } from './environments/environment';


@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
    constructor(
        @Inject('BASE_API_URL') private baseUrl: string
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!isDevMode() || !environment.enableMock || window.location.hostname !== 'localhost') {
            return next.handle(request);
        }

        // use custom api url (eg: for local work)
        if (this.baseUrl) {
            let url = `${this.baseUrl}${request.url}`;
            if (environment.apiKey && url.indexOf('&key=') === -1 && url.indexOf('?key=') === -1) {
                if (url.indexOf('?') > -1) {
                    url += '&key=' + environment.apiKey;
                } else {
                    url += '?key=' + environment.apiKey;
                }
            }
            const apiReq = request.clone({
                url
            });
            return next.handle(apiReq);
        }

        return next.handle(request);
    }
}
