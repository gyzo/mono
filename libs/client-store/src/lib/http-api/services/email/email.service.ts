import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IContactFormValue } from '@mono/client-interfaces';
import { WINDOW } from '@mono/client-util';
import { Observable } from 'rxjs';

import { IMailerResponse } from '../../../github-user/github-user.config';
import { AppHttpHandlersService } from '../../http-handlers.service';

@Injectable({
  providedIn: 'root',
})
export class AppEmailService {
  private readonly url: string = `${this.win.location.origin}/api/sendEmail`;

  constructor(
    private readonly http: HttpClient,
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  public sendEmail(formData: IContactFormValue): Observable<IMailerResponse> {
    return this.handlers.pipeHttpResponse(this.http.post<IMailerResponse>(this.url, formData));
  }
}
