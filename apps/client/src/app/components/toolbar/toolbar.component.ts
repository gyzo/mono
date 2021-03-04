import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarService, chatbotActions } from '@mono/client-store';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  public readonly sidebarOpened$ = this.sidebarService.sidebarOpened$;

  constructor(private readonly store: Store, public readonly sidebarService: AppSidebarService) {}

  public toggleChatbot(): void {
    void this.store.dispatch(new chatbotActions.toggle());
  }
}
