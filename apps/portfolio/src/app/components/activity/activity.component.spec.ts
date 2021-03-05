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
import { AppDummyComponent } from '@mono/client-unit-testing';
import { NgxsModule, Store } from '@ngxs/store';

import { AppMaterialModule } from '../../modules/material/material.module';
import { AppGithubService } from '../../services/github/github.service';
import { AppHttpHandlersService } from '../../services/http-handlers/http-handlers.service';
import { WINDOW } from '../../services/providers.config';
import { AppUserConfigService } from '../../services/user-config/user-config.service';
import { AppUiState } from '../../state/ui/ui.store';
import { AppUserService } from '../../state/user/user.service';
import { AppUserState } from '../../state/user/user.store';
import { AppActivityComponent } from './activity.component';

describe('AppActivityComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppActivityComponent, AppDummyComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      HttpClientTestingModule,
      AppMaterialModule,
      FlexLayoutModule,
      NgxsModule.forRoot([AppUserState, AppUiState]),
      RouterTestingModule.withRoutes([{ path: '', component: AppDummyComponent }]),
    ],
    providers: [
      { provide: WINDOW, useValue: window },
      {
        provide: MatSnackBar,
        useValue: {
          open: (): null => null,
        },
      },
      {
        provide: AppHttpHandlersService,
        useFactory: (snackBar: MatSnackBar) => new AppHttpHandlersService(snackBar),
        deps: [MatSnackBar],
      },
      {
        provide: AppUserConfigService,
        useFactory: (http: HttpClient, handlers: AppHttpHandlersService, window: Window) =>
          new AppUserConfigService(http, handlers, window),
        deps: [HttpClient, AppHttpHandlersService, WINDOW],
      },
      {
        provide: AppGithubService,
        useFactory: (http: HttpClient, handlers: AppHttpHandlersService, window: Window) =>
          new AppGithubService(http, handlers, window),
        deps: [HttpClient, AppHttpHandlersService, WINDOW],
      },
      {
        provide: AppUserService,
        useFactory: (store: Store, userConfig: AppUserConfigService, github: AppGithubService) =>
          new AppUserService(store, userConfig, github),
        deps: [Store, AppUserConfigService, AppGithubService],
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppActivityComponent>;
  let component: AppActivityComponent;
  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppActivityComponent);
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
