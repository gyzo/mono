import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HTTP_STATUS, IWebClientAppEnvironment, WEB_CLIENT_APP_ENV, WINDOW } from '@mono/client-util';
import { TranslateService } from '@ngx-translate/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import memo from 'memo-decorator';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, take, timeout } from 'rxjs/operators';

import { httpProgressActions } from '../http-progress/http-progress.actions';

/**
 * Handlers to work with http requests.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpHandlersService {
  public readonly defaultHttpTimeout = 10000;

  constructor(
    public readonly store: Store,
    public readonly translate: TranslateService,
    @Inject(WINDOW) public readonly win: Window,
    @Inject(WEB_CLIENT_APP_ENV) public readonly env: IWebClientAppEnvironment,
  ) {}

  /**
   * Resolves if app is running on localhost.
   */
  public isLocalhost(): boolean {
    return this.win.location.origin.includes('localhost');
  }

  /**
   * Returns API base url concatenated with provided endpoint path.
   * Adds preceding slash before endpoint path if it is missing.
   * @param path endpoint path
   */
  @memo()
  public getEndpoint(path: string): string {
    const endpoint = /^\/.*$/.test(path) ? path : `/${path}`;
    return `${this.env.api}${endpoint}`;
  }

  /**
   * Pipes request with object response.
   * @param observable request observable
   * @param listenX number of responses to catch
   */
  public pipeHttpResponse<T>(observable: Observable<T>, listenX = 1) {
    void this.store.dispatch(new httpProgressActions.startProgress({ mainView: true }));
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      take(listenX),
      catchError(err => this.handleError(err)),
      finalize(() => {
        void this.store.dispatch(new httpProgressActions.stopProgress({ mainView: true }));
      }),
    );
  }

  public getErrorMessage(error: HttpErrorResponse): string {
    const msg: string = error.message ? error.message : error.error;
    const errorMessage: string = msg ? msg : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return errorMessage;
  }

  /**
   * Handles error.
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    void this.store.dispatch(new httpProgressActions.displayToast({ message: errorMessage, type: 'error' }));
    const unauthorized: boolean = error.status === HTTP_STATUS.UNAUTHORIZED;
    if (unauthorized) {
      void this.store.dispatch(new Navigate(['/']));
    }
    return throwError(() => new Error(errorMessage));
  }
}
