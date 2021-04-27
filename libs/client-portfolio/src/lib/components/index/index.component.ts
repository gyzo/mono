import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppGithubUserService, AppGithubUserState, sidebarUiActions } from '@mono/client-store';
import { WINDOW } from '@mono/client-util';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { AppPortfolioContactComponent } from '../contact/contact.component';

const streamDebounceTime = 500;

/**
 * Application index component.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioIndexComponent {
  public readonly userData$ = this.user.userData$.pipe(debounceTime(streamDebounceTime));

  public readonly githubOrgs$ = this.user.githubOrgs$.pipe(debounceTime(streamDebounceTime));

  public readonly publicEvents$ = this.user.publicEvents$;

  public readonly userConfig$ = this.store.select(AppGithubUserState.getState).pipe(
    map(
      state =>
        state.userConfig ?? {
          apps: [],
          languageIcons: [],
          profiles: [],
          username: {},
        },
    ),
  );

  /**
   * Material dialog instance.
   */
  private dialogInstance?: MatDialogRef<AppPortfolioContactComponent>;

  /**
   * Material dialog subscription.
   */
  private dialogSub?: Subscription;

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog,
    private readonly user: AppGithubUserService,
    @Inject(WINDOW) private readonly win: Window,
  ) {
    void this.user.getUserData().subscribe();
  }

  /**
   * Toggles sidebar state.
   */
  public toggleSidenav(): void {
    void this.store.dispatch(new sidebarUiActions.openSidebar());
  }

  /**
   * Shows contact dialog.
   */
  public showContactDialog(): void {
    this.dialogInstance = this.dialog.open(AppPortfolioContactComponent, {
      height: '80vh',
      width: '90vw',
      maxWidth: '1204px',
      maxHeight: '768px',
      disableClose: false,
      data: {
        domain: this.win.location.origin,
      },
    });
    this.dialogSub = this.dialogInstance.afterClosed().subscribe(() => {
      this.dialogSub?.unsubscribe();
      this.dialogInstance = void 0;
    });
  }
}
