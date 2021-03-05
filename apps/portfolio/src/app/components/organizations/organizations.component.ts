import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGithubUserOrganization } from '../../interfaces/github-api.interface';

/**
 * Application organizations component.
 */
@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppOrganizationsComponent {
  @Input() public githubOrgs: IGithubUserOrganization[] | null = null;
}
