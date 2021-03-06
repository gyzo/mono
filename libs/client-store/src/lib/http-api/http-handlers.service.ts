import { HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  HTTP_STATUS,
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
  WINDOW,
} from '@mono/client-util';
import { TranslateService } from '@ngx-translate/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, take, tap, timeout } from 'rxjs/operators';

import { httpProgressActions } from '../http-progress/http-progress.store';

/**
 * Http handers service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppHttpHandlersService {
  /**
   * Default timeout interval for http-requests.
   */
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
    const p = /^\/.*$/.test(path) ? path : `/${path}`;
    return this.env.api + p;
  }

  /**
   * Pipes request with object response.
   * @param observable request observable
   * @param listenX number of responses to catch
   */
  public pipeHttpResponse<T>(observable: Observable<T>, listenX = 1) {
    return observable.pipe(
      timeout(this.defaultHttpTimeout),
      this.tapProgress<T>(true),
      take(listenX),
      catchError(err => this.handleError(err)),
    );
  }

  public getErrorMessage(error: HttpErrorResponse): string {
    const msg: string = error.message ? error.message : error.error;
    const errorMessage: string = msg
      ? msg
      : error.status
      ? `${error.status} - ${error.statusText}`
      : 'Server error';
    return errorMessage;
  }

  /**
   * Handles error.
   * @param error error object
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    void this.store.dispatch(
      new httpProgressActions.displayToast({ message: errorMessage, type: 'error' }),
    );
    return throwError(errorMessage);
  }

  /**
   * Handles graphQL error response.
   * @param error error message
   */
  public handleGraphQLError(error: string): Observable<never> {
    return throwError(error);
  }

  /**
   * Taps progress.
   * @param withProgress indicates whether progress should be shown
   */
  public tapProgress<T>(widhProgress: boolean): MonoTypeOperatorFunction<T> {
    let handler: () => void = () => {
      // default handler
    };
    if (widhProgress) {
      handler = () => {
        return void this.store.dispatch(new httpProgressActions.stopProgress({ mainView: true }));
      };
    }
    return tap(handler, handler, handler);
  }

  /**
   * Taps errors.
   */
  public tapError<T>(): MonoTypeOperatorFunction<T> {
    return tap(
      (): void => void 0,
      (error: { networkError: HttpErrorResponse }) => {
        const unauthorized: boolean =
          Boolean(error.networkError) && error.networkError.status === HTTP_STATUS.BAD_REQUEST;
        if (unauthorized) {
          void this.store.dispatch(new Navigate(['/']));
        }
      },
    );
  }
}
