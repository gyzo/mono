import { ChangeDetectionStrategy, Component, HostBinding, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  AppHttpProgressState,
  AppSidebarState,
  AppThemeState,
  sidebarUiActions,
  themeActions,
} from '@mono/client-store';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

/**
 * Application root component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRootComponent implements OnInit {
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
  @Select(AppSidebarState.getSidebarOpened)
  public readonly sidenavOpened$!: Observable<boolean>;

  public readonly showSpinner$ = this.store.select(AppHttpProgressState.allProgress).pipe(
    filter(progress => typeof progress.mainView === 'boolean'),
    map(progress => progress.mainView),
  );

  constructor(private readonly store: Store, private readonly dateAdapter: DateAdapter<Date>) {}

  /**
   * Closes sidebar.
   */
  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarUiActions.setState({ sidebarOpened: false }));
  }

  /**
   * Toggles sidenav state.
   */
  public toggleSidenav(): void {
    void this.store.dispatch(new sidebarUiActions.toggleVisibility());
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
