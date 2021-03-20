import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRadarChartDataNode } from '@mono/client-d3-charts';
import { IGithubUserPublicEvent } from '@mono/client-store';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioActivityComponent {
  @Input() public publicEvents: IGithubUserPublicEvent<unknown>[] | null = null;

  /**
   * Creates radar chart data array.
   */
  public get radarChartData() {
    const result = (this.publicEvents ?? []).reduce(
      (accumulator: IRadarChartDataNode[][], event) => {
        const eventTypeName = event.type.replace('Event', '').replace(/(?<!^)([A-Z])/, ' $1');
        const dataNodeIndex = accumulator[0].findIndex(node => node.axis === eventTypeName);
        if (dataNodeIndex !== -1) {
          accumulator[0][dataNodeIndex].value += 1;
        } else {
          const newNode: IRadarChartDataNode = {
            axis: eventTypeName,
            value: 1,
          };
          accumulator[0].push(newNode);
        }
        return accumulator;
      },
      [[]],
    );
    return result;
  }
}
