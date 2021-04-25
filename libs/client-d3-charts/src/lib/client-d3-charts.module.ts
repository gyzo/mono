import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppForceDirectedChartComponent } from './components/force-directed-chart/force-directed-chart.component';
import { AppPieChartComponent } from './components/pie-chart/pie-chart.component';
import { AppRadarChartComponent } from './components/radar-chart/radar-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AppPieChartComponent, AppRadarChartComponent, AppForceDirectedChartComponent],
  exports: [AppPieChartComponent, AppRadarChartComponent, AppForceDirectedChartComponent],
  entryComponents: [AppPieChartComponent, AppRadarChartComponent, AppForceDirectedChartComponent],
})
export class AppClientD3ChartsModule {}
