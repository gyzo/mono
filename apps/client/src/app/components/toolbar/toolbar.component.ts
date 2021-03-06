import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppSidebarService } from '@mono/client-store';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppToolbarComponent {
  public readonly sidebarOpened$ = this.sidebarService.sidebarOpened$;

  constructor(public readonly sidebarService: AppSidebarService) {}
}
