import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppGithubUserState, AppHttpProgressService, AppSidebarState } from '@mono/client-store';
import { AppDummyComponent } from '@mono/client-unit-testing';
import { WINDOW, windowFactory } from '@mono/client-util';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';

import { AppRootComponent } from './root.component';

describe('AppRootComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppRootComponent, AppDummyComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      AppClientMaterialModule.forRoot(),
      FlexLayoutModule,
      NgxsModule.forRoot([AppGithubUserState, AppSidebarState]),
      RouterTestingModule.withRoutes([{ path: '', component: AppDummyComponent }]),
    ],
    providers: [
      { provide: WINDOW, useFactory: windowFactory },
      {
        provide: MatSnackBar,
        useValue: {
          open: (): null => null,
        },
      },
      {
        provide: AppHttpProgressService,
        useValue: {
          output: {
            all$: of(false),
          },
        },
      },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppRootComponent>;
  let component: AppRootComponent;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppRootComponent);
          component = fixture.componentInstance;
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
