import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AppHttpHandlersService, IMailerResponse } from '@mono/client-store';
import { WINDOW } from '@mono/client-util';
import { Observable } from 'rxjs';

import { IContectFormValue } from '../../interfaces/contact-form.interface';

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

  constructor(
    private readonly http: HttpClient,
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  /**
   * Sends email.
   */
  public sendEmail(formData: IContectFormValue): Observable<IMailerResponse> {
    return this.handlers.pipeHttpResponse(this.http.post<IMailerResponse>(this.url, formData));
  }
}
