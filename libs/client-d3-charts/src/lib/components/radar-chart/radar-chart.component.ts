import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChange,
  ViewChild,
} from '@angular/core';

import { IRadarChartDataNode } from '../../interfaces/radar-chart-interface';
import { drawRadarChart } from '../../util/radar-chart.util';

interface IInputChanges {
  data?: SimpleChange | null;
}

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppRadarChartComponent implements AfterViewInit, OnChanges {
  @Input() public chartId = '0';

  @Input() public data: IRadarChartDataNode[][] = [];

  /**
   * D3 chart view child reference.
   */
  @ViewChild('container') private readonly container?: ElementRef<HTMLDivElement>;

  private drawChart() {
    if (typeof this.container !== 'undefined') {
      drawRadarChart(this.container, this.data, {});
    }
  }

  /**
   * Draws chart.
   */
  public ngAfterViewInit(): void {
    this.drawChart();
  }

  /**
   * Redraws chart on changes.
   */
  public ngOnChanges(changes: IInputChanges): void {
    if (Boolean(changes.data?.currentValue)) {
      this.drawChart();
    }
  }
}
