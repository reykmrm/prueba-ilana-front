import Swal from 'sweetalert2';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
              return;
            }

            if (err.status == 0) {
              Swal.fire('Error al conectar con el servidor.');
              return;
            }

            if (err.status == 413) {
              Swal.fire('Supero el limite de registros.');
              return;
            }

            if (err.status == 400) {
              Swal.fire(err.error.result);
              return;
            } else {
              Swal.fire('Error al procesar la solicitud.');
            }
          }
        }
      )
    );
  }
}
