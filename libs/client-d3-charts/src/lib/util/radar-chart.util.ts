import * as d3 from 'd3';

export interface IRadarChartDataItem {
  axis: string;
  value: number;
}

export type TRadarChartData = IRadarChartDataItem[][];

export interface IDrawRadarChartOptions {
  w: number;
  h: number;
  maxValue: number;
  levels: number;
  radius: number;
  radians: number;
  factor: number;
  factorLegend: number;
  opacityArea: number;
  ToRight: number;
  TranslateX: number;
  TranslateY: number;
  ExtraWidthX: number;
  ExtraWidthY: number;
  color: d3.ScaleOrdinal<string, string>;
}

// eslint-disable-next-line max-lines-per-function -- TODO: tech debt
export const drawRadarChart = (
  id: string,
  d: TRadarChartData,
  options: Partial<IDrawRadarChartOptions>,
) => {
  const transitionTime = '200';
  const defaultRadMultiplier = 2;
  const cfg: IDrawRadarChartOptions = {
    radius: 5,
    w: 600,
    h: 600,
    factor: 1,
    factorLegend: 0.85,
    levels: 3,
    maxValue: 0,
    radians: defaultRadMultiplier * Math.PI,
    opacityArea: 0.5,
    ToRight: 5,
    TranslateX: 80,
    TranslateY: 30,
    ExtraWidthX: 100,
    ExtraWidthY: 100,
    color: d3.scaleOrdinal(d3.schemeCategory10),
  };

  if (typeof options !== 'undefined') {
    for (const i in options) {
      if (typeof options[i] !== 'undefined') {
        cfg[i] = options[i];
      }
    }
  }
  cfg.maxValue = Math.max(cfg.maxValue, d3.max(d, i => d3.max(i.map(o => o.value)) ?? 0) ?? 0);
  const allAxis = d[0].map(function (i, j) {
    return i.axis;
  });
  const total = allAxis.length;
  const radius = cfg.factor * Math.min(cfg.w / 2, cfg.h / 2);
  const d3Format = d3.format('%');
  d3.select(id).select('svg').remove();

  const g = d3
    .select(id)
    .append('svg')
    .attr('width', cfg.w + cfg.ExtraWidthX)
    .attr('height', cfg.h + cfg.ExtraWidthY)
    .append('g')
    .attr('transform', `translate(${cfg.TranslateX}, ${cfg.TranslateY})`);

  /**
   * Circular segments.
   */
  for (let j = 0; j < cfg.levels - 1; j += 1) {
    const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
    g.selectAll('.levels')
      .data(allAxis)
      .enter()
      .append('svg:line')
      .attr('x1', function (data, i) {
        return levelFactor * (1 - cfg.factor * Math.sin((i * cfg.radians) / total));
      })
      .attr('y1', function (data, i) {
        return levelFactor * (1 - cfg.factor * Math.cos((i * cfg.radians) / total));
      })
      .attr('x2', function (data, i) {
        return levelFactor * (1 - cfg.factor * Math.sin(((i + 1) * cfg.radians) / total));
      })
      .attr('y2', function (data, i) {
        return levelFactor * (1 - cfg.factor * Math.cos(((i + 1) * cfg.radians) / total));
      })
      .attr('class', 'line')
      .style('stroke', 'grey')
      .style('stroke-opacity', '0.75')
      .style('stroke-width', '0.3px')
      .attr('transform', `translate(${cfg.w / 2 - levelFactor}, ${cfg.h / 2 - levelFactor})`);
  }

  /**
   * Text indicating at what % each level is.
   */
  for (let j = 0; j < cfg.levels; j += 1) {
    const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
    g.selectAll('.levels')
      .data([1]) // dummy data
      .enter()
      .append('svg:text')
      .attr('x', function (data) {
        return levelFactor * (1 - cfg.factor * Math.sin(0));
      })
      .attr('y', function (data) {
        return levelFactor * (1 - cfg.factor * Math.cos(0));
      })
      .attr('class', 'legend')
      .style('font-family', 'sans-serif')
      .style('font-size', '10px')
      .attr(
        'transform',
        `translate(${cfg.w / 2 - levelFactor + cfg.ToRight}, ${cfg.h / 2 - levelFactor})`,
      )
      .attr('fill', '#737373')
      .text(d3Format(((j + 1) * cfg.maxValue) / cfg.levels));
  }

  let series = 0;

  const axis = g.selectAll('.axis').data(allAxis).enter().append('g').attr('class', 'axis');

  axis
    .append('line')
    .attr('x1', cfg.w / 2)
    .attr('y1', cfg.h / 2)
    .attr('x2', function (data, i) {
      return (cfg.w / 2) * (1 - cfg.factor * Math.sin((i * cfg.radians) / total));
    })
    .attr('y2', function (data, i) {
      return (cfg.h / 2) * (1 - cfg.factor * Math.cos((i * cfg.radians) / total));
    })
    .attr('class', 'line')
    .style('stroke', 'grey')
    .style('stroke-width', '1px');

  axis
    .append('text')
    .attr('class', 'legend')
    .text(function (data) {
      return data;
    })
    .style('font-family', 'sans-serif')
    .style('font-size', '11px')
    .attr('text-anchor', 'middle')
    .attr('dy', '1.5em')
    .attr('transform', function (data, i) {
      return 'translate(0, -10)';
    })
    .attr('x', function (data, i) {
      const angle = 60;
      return (
        (cfg.w / 2) * (1 - cfg.factorLegend * Math.sin((i * cfg.radians) / total)) -
        angle * Math.sin((i * cfg.radians) / total)
      );
    })
    .attr('y', function (data, i) {
      const angle = 20;
      return (
        (cfg.h / 2) * (1 - Math.cos((i * cfg.radians) / total)) -
        angle * Math.cos((i * cfg.radians) / total)
      );
    });

  const dataValues: number[][] = [];

  // eslint-disable-next-line max-lines-per-function -- TODO: tech debt
  d.forEach(function (y, x) {
    g.selectAll<SVGElement, IRadarChartDataItem>('.nodes').data(y, (j, i) => {
      return dataValues.push([
        (cfg.w / 2) *
          (1 -
            (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue) *
              cfg.factor *
              Math.sin((i * cfg.radians) / total)),
        (cfg.h / 2) *
          (1 -
            (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue) *
              cfg.factor *
              Math.cos((i * cfg.radians) / total)),
      ]);
    });
    dataValues.push(dataValues[0]);
    g.selectAll('.area')
      .data([dataValues])
      .enter()
      .append('polygon')
      .attr('class', `radar-chart-series${series}`)
      .style('stroke-width', '2px')
      .style('stroke', cfg.color(series.toString()))
      .attr('points', data => {
        let str = '';
        for (let pti = 0; pti < d.length; pti += 1) {
          str = `${str}${data[pti][0]},${data[pti][1]} `;
        }
        return str;
      })
      .style('fill', function (j, i) {
        return cfg.color(series.toString());
      })
      .style('fill-opacity', cfg.opacityArea)
      .on('mouseover', function (data) {
        const z = 'polygon.' + d3.select(this).attr('class');
        const polygonsFillOpacity = 0.1;
        const fillOpacity = 0.7;
        g.selectAll('polygon')
          .transition(transitionTime)
          .style('fill-opacity', polygonsFillOpacity);
        g.selectAll(z).transition(transitionTime).style('fill-opacity', fillOpacity);
      })
      .on('mouseout', function () {
        g.selectAll('polygon').transition(transitionTime).style('fill-opacity', cfg.opacityArea);
      });
    series += 1;
  });
  series = 0;

  /**
   * Tooltip.
   */
  const tooltip = g
    .append('text')
    .style('opacity', 0)
    .style('font-family', 'sans-serif')
    .style('font-size', '13px');

  const nodesFillOpacity = 0.9;
  // eslint-disable-next-line max-lines-per-function -- TODO: tech debt
  d.forEach(function (y, x) {
    g.selectAll<SVGElement, IRadarChartDataItem>('.nodes')
      .data(y)
      .enter()
      .append('svg:circle')
      .attr('class', `radar-chart-series${series}`)
      .attr('r', cfg.radius)
      .attr('alt', function (j) {
        return Math.max(j.value, 0);
      })
      .attr('cx', function (j, i) {
        dataValues.push([
          (cfg.w / 2) *
            (1 -
              (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue) *
                cfg.factor *
                Math.sin((i * cfg.radians) / total)),
          (cfg.h / 2) *
            (1 -
              (parseFloat(Math.max(j.value, 0).toString()) / cfg.maxValue) *
                cfg.factor *
                Math.cos((i * cfg.radians) / total)),
        ]);
        return (
          (cfg.w / 2) *
          (1 -
            (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.sin((i * cfg.radians) / total))
        );
      })
      .attr('cy', function (j, i) {
        return (
          (cfg.h / 2) *
          (1 -
            (Math.max(j.value, 0) / cfg.maxValue) *
              cfg.factor *
              Math.cos((i * cfg.radians) / total))
        );
      })
      .attr('data-id', function (j) {
        return j.axis;
      })
      .style('fill', cfg.color(series.toString()))
      .style('fill-opacity', nodesFillOpacity)
      .on('mouseover', function (data: { value: number }) {
        const modX = -10;
        const modY = -5;
        const newX = parseFloat(d3.select(this).attr('cx')) + modX;
        const newY = parseFloat(d3.select(this).attr('cy')) + modY;

        tooltip
          .attr('x', newX)
          .attr('y', newY)
          .text(d3Format(data.value))
          .transition(transitionTime)
          .style('opacity', 1);

        const z = 'polygon.' + d3.select(this).attr('class');
        const polygonsFillOpacity = 0.1;
        const fillOpacity = 0.7;
        g.selectAll('polygon')
          .transition(transitionTime)
          .style('fill-opacity', polygonsFillOpacity);
        g.selectAll(z).transition(transitionTime).style('fill-opacity', fillOpacity);
      })
      .on('mouseout', function () {
        tooltip.transition(transitionTime).style('opacity', 0);
        g.selectAll('polygon').transition(transitionTime).style('fill-opacity', cfg.opacityArea);
      })
      .append('svg:title')
      .text(function (j) {
        return Math.max(j.value, 0);
      });

    series += 1;
  });
};
