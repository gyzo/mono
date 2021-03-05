import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGuthubUser } from '../../interfaces/github-api.interface';

/**
 * Application status badges component.
 */
@Component({
  selector: 'app-status-badges',
  templateUrl: './status-badges.component.html',
  styleUrls: ['./status-badges.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppStatusBadgesComponent {
  @Input() public github?: IGuthubUser;
}
