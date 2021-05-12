import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarState, sidebarUiActions } from '@mono/client-store';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppContentComponent {
  public readonly sidebarOpened$ = this.store.select(AppSidebarState.getState).pipe(map(state => state.sidebarOpened));

  constructor(private readonly store: Store) {}

  public sidebarCloseHandler(): void {
    void this.store.dispatch(new sidebarUiActions.closeSidebar());
  }

  public sidebarOpenHandler(): void {
    void this.store.dispatch(new sidebarUiActions.openSidebar());
  }
}
