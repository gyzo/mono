import { ChangeDetectionStrategy, Component } from '@angular/core';
import { websocketActions } from '@mono/client-store';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-diagnostics-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppIndexComponent {
  constructor(private readonly store: Store) {
    void this.store.dispatch(new websocketActions.connect());
    void this.store.dispatch(new websocketActions.getEvents());
  }
}
