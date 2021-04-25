import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import {
  IDrawForceDirectedChartOptions,
  IForceDirectedChartData,
  IForceDirectedChartDataNode,
} from '../interfaces/force-directed-chart.interface';

const ticked = (
  link?: d3.Selection<
    SVGLineElement,
    d3.SimulationLinkDatum<IForceDirectedChartDataNode>,
    SVGSVGElement,
    unknown
  >,
  node?: d3.Selection<SVGCircleElement, IForceDirectedChartDataNode, SVGSVGElement, unknown>,
  text?: d3.Selection<SVGTextElement, IForceDirectedChartDataNode, SVGGElement, unknown>,
) => {
  if (typeof link !== 'undefined') {
    link
      .attr('x1', d => (d.source as IForceDirectedChartDataNode).x ?? 0)
      .attr('y1', d => (d.source as IForceDirectedChartDataNode).y ?? 0)
      .attr('x2', d => (d.target as IForceDirectedChartDataNode).x ?? 0)
      .attr('y2', d => (d.target as IForceDirectedChartDataNode).y ?? 0);
  }

  if (typeof node !== 'undefined') {
    node.attr('cx', d => d.x ?? 0).attr('cy', d => d.y ?? 0);
  }

  if (typeof text !== 'undefined') {
    const dx = 10;
    const dy = 5;
    text.attr('x', d => (d.x ?? 0) + dx).attr('y', d => (d.y ?? 0) - dy);
  }

  return 'rotate(0)';
};

// eslint-disable-next-line max-lines-per-function -- TODO: tech debt
export const drawForceDirectedChart = (
  container: ElementRef<HTMLDivElement>,
  data: IForceDirectedChartData,
  options?: Partial<IDrawForceDirectedChartOptions>,
) => {
  const id = container.nativeElement.id ?? 'force-directed-0';
  const chartConfig: IDrawForceDirectedChartOptions = {
    w: 600,
    h: 600,
    charge: -10,
    distance: 100,
    fontSize: 10,
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    strokeWidth: 2, // the width of the stroke around each blob
    color: d3.scaleOrdinal(d3.schemeCategory10), //Color function
  };

  /**
   * Copy options to configuration object.
   */
  if (typeof options !== 'undefined') {
    for (const i in options) {
      if (typeof options[i] !== 'undefined') {
        chartConfig[i] = options[i];
      }
    }
  }

  /**
   * Create the container SVG and g,
   */
  // clear chart container
  d3.select(`#${id}`).select('svg').remove();

  const svg = d3
    .select(`#${id}`)
    .append('svg')
    .attr('width', chartConfig.w + chartConfig.margin.left + chartConfig.margin.right)
    .attr('height', chartConfig.h + chartConfig.margin.top + chartConfig.margin.bottom)
    .attr('class', id);

  // append a g element
  const g = svg
    .append('g')
    .attr(
      'transform',
      `translate(${chartConfig.w / 2 + chartConfig.margin.left},${
        chartConfig.h / 2 + chartConfig.margin.top
      })`,
    );

  const imageXY = 10;
  g.append('defs')
    .selectAll('pattern')
    .data(data.entities)
    .enter()
    .append('pattern')
    .attr('id', (val, i) => {
      return `img-${val.index}`;
    })
    .attr('x', 0)
    .attr('y', 0)
    .attr('height', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .attr('width', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .append('image')
    .attr('x', imageXY)
    .attr('y', imageXY)
    .attr('height', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .attr('width', val => {
      const baseValue = 30;
      return baseValue + val.linksCount * 2;
    })
    .attr('xlink:href', function (val) {
      return val.img;
    });

  const force = d3
    .forceSimulation(data.nodes)
    .force('charge', d3.forceManyBody().strength(chartConfig.charge))
    .force('center', d3.forceCenter(chartConfig.w / 2, chartConfig.h / 2))
    .force(
      'link',
      d3
        .forceLink()
        .id(d => d.index ?? 0)
        .distance(chartConfig.distance)
        .strength(chartConfig.charge),
    );

  const link = svg
    .selectAll('.link')
    .data(data.links)
    .enter()
    .append('line')
    .attr('class', 'link')
    .style('stroke-width', chartConfig.strokeWidth)
    .attr('marker-end', 'url(#arrowhead)');

  const node = svg
    .selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', (val, i) => {
      const baseValue = 25;
      const valueMultiplier = 3;
      const linksCountMultiplier = 1.001;
      return typeof val.value !== 'undefined'
        ? 2 + val.value * valueMultiplier
        : baseValue + (val.linksCount ?? 0) * linksCountMultiplier;
    })
    .style('stroke-width', val => {
      const valueMultiplier = 3;
      const linksCountMultiplier = 1.001;
      return typeof val.value !== 'undefined'
        ? 2 + val.value * valueMultiplier
        : 2 + (val.linksCount ?? 0) * linksCountMultiplier;
    })
    .style('fill', val => {
      return typeof val.value !== 'undefined' ? '#f00000' : `url(#img-${val.index})`;
    });

  const text = svg
    .append('g')
    .selectAll('text')
    .data(data.nodes)
    .enter()
    .append('text')
    .text(val => val.domain ?? val.username ?? '');

  force.nodes(data.nodes).on('tick', () => {
    ticked(link, node, text);
  });
};
