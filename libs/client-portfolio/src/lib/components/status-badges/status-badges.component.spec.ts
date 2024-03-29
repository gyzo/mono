import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppTestingComponent } from '@mono/client-unit-testing';

import { AppPortfolioStatusBadgesComponent } from './status-badges.component';

describe('AppPortfolioStatusBadgesComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppPortfolioStatusBadgesComponent, AppTestingComponent],
    imports: [BrowserDynamicTestingModule, NoopAnimationsModule, HttpClientTestingModule, AppClientMaterialModule, FlexLayoutModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppPortfolioStatusBadgesComponent>;
  let component: AppPortfolioStatusBadgesComponent;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppPortfolioStatusBadgesComponent);
          component = fixture.componentInstance;

          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
