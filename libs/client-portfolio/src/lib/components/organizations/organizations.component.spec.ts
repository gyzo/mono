import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppDummyComponent } from '@mono/client-unit-testing';

import { AppPortfolioOrganizationsComponent } from './organizations.component';

describe('AppPortfolioOrganizationsComponent', () => {
  const testBedConfig: TestModuleMetadata = {
    declarations: [AppPortfolioOrganizationsComponent, AppDummyComponent],
    imports: [BrowserDynamicTestingModule, NoopAnimationsModule, HttpClientTestingModule, AppClientMaterialModule, FlexLayoutModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  };

  let fixture: ComponentFixture<AppPortfolioOrganizationsComponent>;
  let component: AppPortfolioOrganizationsComponent;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppPortfolioOrganizationsComponent);
          component = fixture.componentInstance;

          fixture.detectChanges();
        });
    }),
  );

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
