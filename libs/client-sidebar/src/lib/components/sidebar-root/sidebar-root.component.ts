import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarService } from '@mono/client-store';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-sidebar-root',
  templateUrl: './sidebar-root.component.html',
  styleUrls: ['./sidebar-root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSidebarRootComponent {
  constructor(private readonly store: Store, private readonly sidebarService: AppSidebarService) {}

  /**
   * Sidebar close handler.
   * Propagates sidebar close event from UI to state store.
   */
  public sidebarCloseHandler(): void {
    this.sidebarService.close();
    void this.store.dispatch(new Navigate([{ outlets: { primary: 'info' } }]));
  }
}
