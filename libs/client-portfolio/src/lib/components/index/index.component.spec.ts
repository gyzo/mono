import { HttpRequest } from '@angular/common/http';
import { HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, TestModuleMetadata, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppClientMaterialModule } from '@mono/client-material';
import { AppGithubUserService, AppGithubUserState } from '@mono/client-store';
import { AppDummyComponent, getTestBedConfig, newTestBedMetadata } from '@mono/client-unit-testing';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';

import { AppPortfolioIndexComponent } from './index.component';

describe('AppPortfolioIndexComponent', () => {
  const testBedMetadata: TestModuleMetadata = newTestBedMetadata({
    declarations: [AppPortfolioIndexComponent],
    imports: [
      AppClientMaterialModule,
      NgxsModule.forFeature([AppGithubUserState]),
      RouterTestingModule.withRoutes([{ path: '', component: AppDummyComponent }]),
    ],
    providers: [
      {
        provide: AppGithubUserService,
        useValue: {
          userData$: of({}),
          githubOrgs$: of([]),
          publicEvents$: of([]),
          getUserData: () => of({}),
        },
      },
    ],
  });
  const testBedConfig: TestModuleMetadata = getTestBedConfig(testBedMetadata);

  let fixture: ComponentFixture<AppPortfolioIndexComponent>;
  let component: AppPortfolioIndexComponent;
  let httpController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      void TestBed.configureTestingModule(testBedConfig)
        .compileComponents()
        .then(() => {
          fixture = TestBed.createComponent(AppPortfolioIndexComponent);
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
