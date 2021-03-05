import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { IMailerResponse } from '../../interfaces/user-config.interface';
import {
  AppHttpHandlersService,
  HTTP_PROGRESS_MODIFIER,
} from '../http-handlers/http-handlers.service';
import { WINDOW } from '../providers.config';

/**
 * Send email service.
 */
@Injectable({
  providedIn: 'root',
})
export class AppSendEmailService {
  /**
   * Endpoint.
   */
  private readonly url: string = `${this.win.location.origin}/api/sendEmail`;

  /**
   * Constructor.
   */
  constructor(
    private readonly http: HttpClient,
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  /**
   * Sends email.
   */
  public sendEmail(formData: unknown): Observable<IMailerResponse> {
    this.handlers.toggleHttpProgress(HTTP_PROGRESS_MODIFIER.START);
    return this.http.post<IMailerResponse>(this.url, formData).pipe(
      catchError((error: HttpErrorResponse) => this.handlers.handleError(error)),
      finalize(() => {
        this.handlers.toggleHttpProgress(HTTP_PROGRESS_MODIFIER.STOP);
      }),
    );
  }
}
