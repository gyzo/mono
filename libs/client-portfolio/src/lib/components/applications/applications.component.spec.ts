import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import {
  AppGithubApiService,
  AppGithubUserService,
  AppGithubUserState,
  AppHttpHandlersService,
  AppSidebarState,
  AppUserConfigService,
} from '@mono/client-store';
import { AppDummyComponent, testingEnvironment } from '@mono/client-unit-testing';
import {
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
  WINDOW,
  windowFactory,
} from '@mono/client-util';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';

import { AppPortfolioApplicationsComponent } from './applications.component';

describe('AppPortfolioApplicationsComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppPortfolioApplicationsComponent, AppDummyComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      HttpClientTestingModule,
      AppClientMaterialModule,
      FlexLayoutModule,
      NgxsModule.forRoot([AppGithubUserState, AppSidebarState]),
      RouterTestingModule.withRoutes([{ path: '', component: AppDummyComponent }]),
      TranslateModule.forRoot(),
    ],
    providers: [
      { provide: WINDOW, useFactory: windowFactory },
      { provide: WEB_CLIENT_APP_ENV, useValue: testingEnvironment },
      {
        provide: MatSnackBar,
        useValue: {
          open: (): null => null,
        },
      },
      {
        provide: AppHttpHandlersService,
        useFactory: (
          store: Store,
          translate: TranslateService,
          win: Window,
          appEnv: IWebClientAppEnvironment,
        ) => new AppHttpHandlersService(store, translate, win, appEnv),
        deps: [Store, TranslateService, WINDOW, WEB_CLIENT_APP_ENV],
      },
      {
        provide: AppUserConfigService,
        useFactory: (http: HttpClient, handlers: AppHttpHandlersService, window: Window) =>
          new AppUserConfigService(http, handlers, window),
        deps: [HttpClient, AppHttpHandlersService, WINDOW],
      },
      {
        provide: AppGithubApiService,
        useFactory: (
          http: HttpClient,
          store: Store,
          handlers: AppHttpHandlersService,
          window: Window,
        ) => new AppGithubApiService(http, store, handlers, window),
        deps: [HttpClient, Store, AppHttpHandlersService, WINDOW],
      },
      {
        provide: AppGithubUserService,
        useFactory: (store: Store, userConfig: AppUserConfigService, github: AppGithubApiService) =>
          new AppGithubUserService(store, userConfig, github),
        deps: [Store, AppUserConfigService, AppGithubApiService],
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppPortfolioApplicationsComponent>;
  let component: AppPortfolioApplicationsComponent;
  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppPortfolioApplicationsComponent);
          component = fixture.componentInstance;
          httpController = TestBed.inject(HttpTestingController);
          httpController
            .match((req: HttpRequest<unknown>): boolean => true)
            .forEach((req: TestRequest) => {
              req.flush({});
            });
          fixture.detectChanges();
        });
    }),
  );

  afterEach(() => {
    httpController
      .match((req: HttpRequest<unknown>): boolean => true)
      .forEach((req: TestRequest) => {
        req.flush({});
      });
    httpController.verify();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
