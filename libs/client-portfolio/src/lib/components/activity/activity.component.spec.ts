import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppGithubUserState, AppSidebarState } from '@mono/client-store';
import { AppTestingComponent } from '@mono/client-unit-testing';
import { WINDOW, windowFactory } from '@mono/client-util';
import { NgxsModule } from '@ngxs/store';

import { AppPortfolioActivityComponent } from './activity.component';

describe('AppPortfolioActivityComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppPortfolioActivityComponent, AppTestingComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      HttpClientTestingModule,
      AppClientMaterialModule,
      FlexLayoutModule,
      NgxsModule.forRoot([AppGithubUserState, AppSidebarState]),
      RouterTestingModule.withRoutes([{ path: '', component: AppTestingComponent }]),
    ],
    providers: [
      { provide: WINDOW, useFactory: windowFactory },
      {
        provide: MatSnackBar,
        useValue: {
          open: (): null => null,
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppPortfolioActivityComponent>;
  let component: AppPortfolioActivityComponent;
  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppPortfolioActivityComponent);
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
