import { HttpClient, HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppEmailService, AppHttpHandlersService } from '@mono/client-store';
import { AppDialogRefMock, AppDummyComponent, testingEnvironment } from '@mono/client-unit-testing';
import {
  IWebClientAppEnvironment,
  WEB_CLIENT_APP_ENV,
  WINDOW,
  windowFactory,
} from '@mono/client-util';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NgxsModule, Store } from '@ngxs/store';

import { AppPortfolioContactComponent } from './contact.component';

describe('AppPortfolioContactComponent', () => {
  const MOCKED_MODAL_DATA: Record<string, unknown> = {};

  const testBedConfig: TestModuleMetadata = {
    declarations: [AppPortfolioContactComponent, AppDummyComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientTestingModule,
      AppClientMaterialModule,
      NgxsModule.forRoot([]),
      FlexLayoutModule,
      RouterTestingModule.withRoutes([{ path: '', component: AppDummyComponent }]),
      TranslateModule.forRoot(),
    ],
    providers: [
      Store,
      { provide: WINDOW, useFactory: windowFactory },
      { provide: WEB_CLIENT_APP_ENV, useValue: testingEnvironment },
      { provide: MAT_DIALOG_DATA, useValue: MOCKED_MODAL_DATA },
      {
        provide: MatDialogRef,
        useFactory: () => new AppDialogRefMock(),
        deps: [],
      },
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
        provide: AppEmailService,
        useFactory: (http: HttpClient, handlers: AppHttpHandlersService, window: Window) =>
          new AppEmailService(http, handlers, window),
        deps: [HttpClient, AppHttpHandlersService, WINDOW],
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppPortfolioContactComponent>;
  let component: AppPortfolioContactComponent;
  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppPortfolioContactComponent);
          component = fixture.componentInstance;
          httpController = TestBed.inject(HttpTestingController);
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
