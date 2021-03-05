import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  HTTP_STATUS,
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
  WINDOW,
} from '@mono/client-util';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import memo from 'memo-decorator';
import { MonoTypeOperatorFunction, Observable, throwError } from 'rxjs';
import { catchError, first, map, take, tap, timeout } from 'rxjs/operators';

import { AppHttpProgressService } from '../http-progress/http-progress.service';
import { AppToasterService } from '../http-progress/services/toaster/toaster.service';
import { AppUserState } from '../user';
import { userActions } from '../user/user.store';

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

  public readonly userToken$: Observable<string> = this.store.select(AppUserState.token);

  constructor(
    public readonly store: Store,
    public readonly toaster: AppToasterService,
    public readonly httpProgress: AppHttpProgressService,
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
   * Resolver graphQL base url, adds correct protocol.
   */
  public graphQlEndpoint(): string {
    const url = `${this.env.api}/graphql`;
    return url;
  }

  /**
   * Returns new http headers for GraphQL.
   */
  public getGraphQLHttpHeaders() {
    return this.userToken$.pipe(
      first(),
      map(token => {
        return new HttpHeaders({
          Authorization: `Token ${token}`,
        });
      }),
    );
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

  /**
   * Check error status, and reset token if status is 401.
   * Note on errors:
   * 401 - unauthorized token expired
   * @param status error status
   */
  public checkErrorStatusAndRedirect(status: HTTP_STATUS): void {
    if (status === HTTP_STATUS.UNAUTHORIZED) {
      void this.store.dispatch(new userActions.setState({ token: '' })).subscribe();
    }
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
    this.toaster.showToaster(errorMessage, 'error');
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
    let handler: () => MonoTypeOperatorFunction<T> = () =>
      tap<T>(
        () => void 0,
        () => void 0,
      );
    if (widhProgress) {
      handler = this.httpProgress.handlers.mainView.tapStopperObservable;
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
          this.checkErrorStatusAndRedirect(HTTP_STATUS.UNAUTHORIZED);
        }
      },
    );
  }
}
