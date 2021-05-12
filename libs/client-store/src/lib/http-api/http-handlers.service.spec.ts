import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { AppClientTranslateModule } from '@mono/client-translate';
import { AppLocalStorageMock, getTestBedConfig, newTestBedMetadata } from '@mono/client-unit-testing';
import { IWebClientAppEnvironment, WEB_CLIENT_APP_ENV, WINDOW } from '@mono/client-util';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AppHttpProgressStoreModule } from '../http-progress/http-progress.module';
import { httpProgressServiceProvider } from '../http-progress/http-progress.service';
import { AppToasterService, toasterServiceProvider } from '../http-progress/services/toaster/toaster.service';
import { AppHttpHandlersService } from './http-handlers.service';

describe('AppHttpHandlersService', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    imports: [AppClientTranslateModule.forRoot(), AppHttpProgressStoreModule],
    providers: [
      toasterServiceProvider,
      httpProgressServiceProvider,
      {
        provide: AppHttpHandlersService,
        useFactory: (store: Store, translate: TranslateService, win: Window, env: IWebClientAppEnvironment) =>
          new AppHttpHandlersService(store, translate, win, env),
        deps: [Store, TranslateService, WINDOW, WEB_CLIENT_APP_ENV],
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let service: AppHttpHandlersService;
  let httpTestingController: HttpTestingController;
  let localStorage: AppLocalStorageMock;
  let toaster: AppToasterService;

  beforeEach(
    waitForAsync(() => {
      localStorage = window.localStorage;
      jest.spyOn(localStorage, 'setItem');

      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          service = TestBed.inject(AppHttpHandlersService);
          toaster = TestBed.inject(AppToasterService);
          httpTestingController = TestBed.inject(HttpTestingController);
        });
    }),
  );

  afterEach(() => {
    httpTestingController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => (!req.cancelled ? req.flush({}) : null));
    httpTestingController.verify();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(toaster).toBeDefined();
  });

  it('should have variables and methods defined', () => {
    expect(service.defaultHttpTimeout).toEqual(expect.any(Number));
    expect(service.isLocalhost).toEqual(expect.any(Function));
    expect(service.getEndpoint).toEqual(expect.any(Function));
    expect(service.handleError).toEqual(expect.any(Function));
    expect(service.pipeHttpResponse).toEqual(expect.any(Function));
  });

  describe('handleError', () => {
    it(
      'should handle errors properly #1',
      waitForAsync(() => {
        const errRes = new HttpErrorResponse({
          status: 400,
          statusText: 'error status text',
        });
        void service
          .handleError(errRes)
          .pipe(
            catchError((error: Error) => {
              expect(error.message).toEqual(service.getErrorMessage(errRes));
              return of(null);
            }),
          )
          .subscribe();
      }),
    );

    it(
      'should handle errors properly #2',
      waitForAsync(() => {
        const errRes = new HttpErrorResponse({});
        void service
          .handleError(errRes)
          .pipe(
            catchError((error: Error) => {
              expect(error.message).toEqual(service.getErrorMessage(errRes));
              return of(null);
            }),
          )
          .subscribe();
      }),
    );
  });

  describe('isLocalhost', () => {
    it('should resolve if application is requested from localhost over http', () => {
      expect(service.isLocalhost()).toBeTruthy();
    });
  });

  it('pipeHttpResponse should work correctly', () => {
    const observable = of({ data: {} });
    let pipedRequest = service.pipeHttpResponse(observable);
    expect(pipedRequest).toEqual(expect.any(Observable));
    pipedRequest = service.pipeHttpResponse(observable, 1);
  });
});
