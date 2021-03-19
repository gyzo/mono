import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { drawPieChart, IPieChartDataNode } from '@mono/client-d3-charts';
import { IGithubUserPublicEvent } from '@mono/client-store';

interface IInputChanges extends SimpleChanges {
  publicEvents: SimpleChange;
}

/**
 * Application activity component.
 */
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioActivityComponent implements OnChanges, AfterViewInit {
  /**
   * Public events.
   */
  @Input() public publicEvents: IGithubUserPublicEvent<unknown>[] | null = null;

  /**
   * D3 chart view child reference.
   */
  @ViewChild('canvas') private readonly canvas?: ElementRef<HTMLCanvasElement>;

  /**
   * Creates chart data array.
   */
  private getChartData() {
    return (this.publicEvents ?? []).reduce((accumulator: IPieChartDataNode[], event) => {
      const eventTypeName = event.type.replace('Event', '').replace(/(?<!^)([A-Z])/, ' $1');
      const dataNodeIndex = accumulator.findIndex(node => node.key === eventTypeName);
      if (dataNodeIndex !== -1) {
        accumulator[dataNodeIndex].y += 1;
      } else {
        const newNode = { key: eventTypeName, y: 1 };
        accumulator.push(newNode);
      }
      return accumulator;
    }, []);
  }

  /**
   * Draws chart.
   */
  public drawChart(): void {
    if (typeof this.canvas !== 'undefined') {
      const chartData = this.getChartData();
      drawPieChart(this.canvas, chartData);
    }
  }

  /**
   * Draws chart after view is initialized.
   */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /**
   * Redraws chart on changes.
   * @param changes
   */
  public ngOnChanges(changes: IInputChanges): void {
    if (changes.publicEvents.currentValue !== null) {
      this.drawChart();
    }
  }
}
