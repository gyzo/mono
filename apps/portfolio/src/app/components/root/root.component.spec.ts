import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppDummyComponent } from '@mono/client-unit-testing';
import { NgxsModule } from '@ngxs/store';

import { AppMaterialModule } from '../../modules/material/material.module';
import { AppHttpHandlersService } from '../../services/http-handlers/http-handlers.service';
import { WINDOW } from '../../services/providers.config';
import { AppUiState } from '../../state/ui/ui.store';
import { AppUserState } from '../../state/user/user.store';
import { AppRootComponent } from './root.component';

describe('AppRootComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppRootComponent, AppDummyComponent],
    imports: [
      BrowserDynamicTestingModule,
      NoopAnimationsModule,
      AppMaterialModule.forRoot(),
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
