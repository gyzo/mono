import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { AppSidebarState, AppThemeState, sidebarUiActions, themeActions } from '@mono/client-store';
import { Store } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';

/**
 * Application root component.
 */
@Component({
  selector: 'app-portfolio-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioRootComponent implements OnInit {
  /**
   * Defines if UI should use alternative dark material theme.
   */
  @HostBinding('class.unicorn-dark-theme') public darkTheme = false;

  /**
   * Asyncronous material theme state.
   */
  public readonly getTheme$ = this.store.select(AppThemeState.getTheme).pipe(
    tap(theme => {
      this.darkTheme = theme.darkThemeEnabled;
    }),
  );

  /**
   * Sidenav opened state.
   */
  public readonly sidebarOpened$ = this.store
    .select(AppSidebarState.getState)
    .pipe(map(state => state.sidebarOpened));

  constructor(private readonly store: Store, private readonly dateAdapter: DateAdapter<Date>) {}

  /**
   * Closes sidebar.
   */
  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarUiActions.closeSidebar());
  }

  /**
   * Sets application theme depending on time.
   */
  public setTheme(): void {
    const hours = new Date().getHours();
    const morning = 9;
    const evening = 18;
    const darkThemeEnabled = hours <= morning || hours >= evening ? true : false;
    void this.store.dispatch(new themeActions.setThemeState({ darkThemeEnabled })).subscribe();
  }

  /**
   * Lifecycle hook.
   */
  public ngOnInit(): void {
    this.setDatepickerLocale();
    /**
     * @note TODO: set theme
     */
    // this.setTheme();
  }

  /**
   * Sets datepicker locale.
   */
  private setDatepickerLocale(): void {
    this.dateAdapter.setLocale('en');
  }
}
