import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-diagnostics-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppInfoPage {
  @Input() public ping = '';

  @Input() public markedInstructions = '';
}
