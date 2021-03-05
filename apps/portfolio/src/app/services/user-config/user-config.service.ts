import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { IUserConfig } from '../../interfaces/user-config.interface';
import {
  AppHttpHandlersService,
  HTTP_PROGRESS_MODIFIER,
} from '../http-handlers/http-handlers.service';
import { WINDOW } from '../providers.config';

/**
 * User configuration service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppUserConfigService {
  /**
   * User config json.
   */
  private readonly url: string = `${this.win.location.origin}/assets/config.json`;

  /**
   * Constructor.
   */
  constructor(
    private readonly http: HttpClient,
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  /**
   * Gets user config over http.
   */
  public getUserConfig(): Observable<IUserConfig> {
    this.handlers.toggleHttpProgress(HTTP_PROGRESS_MODIFIER.START);
    return this.http.get<IUserConfig>(this.url).pipe(
      catchError((error: HttpErrorResponse) => this.handlers.handleError(error)),
      finalize(() => {
        this.handlers.toggleHttpProgress(HTTP_PROGRESS_MODIFIER.STOP);
      }),
    );
  }
}
