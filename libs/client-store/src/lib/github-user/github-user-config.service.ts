import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { WINDOW } from '@mono/client-util';
import { Observable } from 'rxjs';

import { AppHttpHandlersService } from '../http-api/http-handlers.service';
import { IUserConfig } from './github-user.config';

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

  constructor(
    private readonly http: HttpClient,
    private readonly handlers: AppHttpHandlersService,
    @Inject(WINDOW) private readonly win: Window,
  ) {}

  /**
   * Gets user config over http.
   */
  public getUserConfig(): Observable<IUserConfig> {
    return this.handlers.pipeHttpResponse(this.http.get<IUserConfig>(this.url).pipe());
  }
}
