import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.loadingService.startLoading();
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer YourAuthToken',
      },
    });
    return next.handle(modifiedRequest).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        //if (httpEvent.type == HttpEventType.Response) {
        if (httpEvent instanceof HttpResponse) {
          this.toastr.success('Giriş Başarılı');
          console.log('Cevap alındı:', httpEvent);
        }
      }),
      catchError((err: any) => {
        // işlem..
        console.log('Hatalı cevap alındı:', err);
        this.toastr.error('Hatalı giriş');
        throw err;
      }),
      finalize(() => {
        this.loadingService.stopLoading();
      })
    );
  }
}

//kminchelle
//0lelplR
