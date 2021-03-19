import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

import {
  IDrawRadarChartOptions,
  IRadarChartDataNode,
  TRadarChartData,
} from '../interfaces/radar-chart-interface';

// eslint-disable-next-line max-lines-per-function -- TODO: tech debt
export const drawRadarChart = (
  container: ElementRef<HTMLDivElement>,
  data: TRadarChartData,
  options?: Partial<IDrawRadarChartOptions>,
) => {
  const id = container.nativeElement.id ?? 'radar-0';
  const transitionDuration = 200;
  const cfg: IDrawRadarChartOptions = {
    w: 600, //Width of the circle
    h: 600, //Height of the circle
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    }, //The margins of the SVG
    levels: 3, //How many levels or inner circles should there be drawn
    maxValue: 0, //What is the value that the biggest circle will represent
    labelFactor: 1.25, //How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, //The number of pixels after which a label needs to be given a new line
    opacityArea: 0.35, //The opacity of the area of the blob
    dotRadius: 4, //The size of the colored circles of each blog
    opacityCircles: 0.1, //The opacity of the circles of each blob
    strokeWidth: 2, //The width of the stroke around each blob
    roundStrokes: false, //If true the area and stroke will follow a round path (cardinal-closed)
    color: d3.scaleOrdinal(d3.schemeCategory10), //Color function
  };

  // Put all of the options into a variable called cfg
  if (typeof options !== 'undefined') {
    for (const i in options) {
      if (typeof options[i] !== 'undefined') {
        cfg[i] = options[i];
      }
    }
  }

  // If the supplied maxValue is smaller than the actual one, replace by the max in the data
  const maxValue = Math.max(cfg.maxValue, d3.max(data, i => d3.max(i.map(o => o.value))) ?? 0);

  const allAxis = data[0].map(function (i, j) {
    return i.axis;
  }); // Names of each axis
  const total = allAxis.length; //The number of different axes
  const radius = Math.min(cfg.w / 2, cfg.h / 2); //Radius of the outermost circle
  const d3Format = d3.format('%'); //Percentage formatting
  const angleSlice = (Math.PI * 2) / total; //The width in radians of each "slice"

  // Scale for the radius
  const rScale = d3.scaleLinear([0, radius]).domain([0, maxValue]);

  /////////////////////////////////////////////////////////
  //////////// Create the container SVG and g /////////////
  /////////////////////////////////////////////////////////

  // Remove whatever chart with the same id/class was present before
  d3.select(id).select('svg').remove();

  // Initiate the radar chart SVG
  const svg = d3
    .select(id)
    .append('svg')
    .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
    .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr('class', `radar${id}`);
  // Append a g element
  const g = svg
    .append('g')
    .attr('transform', `translate(${cfg.w / 2 + cfg.margin.left},${cfg.h / 2 + cfg.margin.top})`);

  /////////////////////////////////////////////////////////
  ////////// Glow filter for some extra pizzazz ///////////
  /////////////////////////////////////////////////////////

  // Filter for the outside glow
  const filter = g.append('defs').append('filter').attr('id', 'glow');
  filter.append('feGaussianBlur').attr('stdDeviation', '2.5').attr('result', 'coloredBlur');

  const feMerge = filter.append('feMerge');
  feMerge.append('feMergeNode').attr('in', 'coloredBlur');
  feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

  /////////////////////////////////////////////////////////
  /////////////// Draw the Circular grid //////////////////
  /////////////////////////////////////////////////////////

  //Wrapper for the grid & axes
  const axisGrid = g.append('g').attr('class', 'axisWrapper');

  //Draw the background circles
  axisGrid
    .selectAll('.levels')
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append('circle')
    .attr('class', 'gridCircle')
    .attr('r', function (d, i) {
      return (radius / cfg.levels) * d;
    })
    .style('fill', '#CDCDCD')
    .style('stroke', '#CDCDCD')
    .style('fill-opacity', cfg.opacityCircles)
    .style('filter', 'url(#glow)');

  //Text indicating at what % each level is
  const axisGridX = 4;
  axisGrid
    .selectAll('.axisLabel')
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append('text')
    .attr('class', 'axisLabel')
    .attr('x', axisGridX)
    .attr('y', function (d) {
      return (-d * radius) / cfg.levels;
    })
    .attr('dy', '0.4em')
    .style('font-size', '10px')
    .attr('fill', '#737373')
    .text(function (d, i) {
      return d3Format((maxValue * d) / cfg.levels);
    });

  /////////////////////////////////////////////////////////
  //////////////////// Draw the axes //////////////////////
  /////////////////////////////////////////////////////////

  //Create the straight lines radiating outward from the center
  const axis = axisGrid.selectAll('.axis').data(allAxis).enter().append('g').attr('class', 'axis');
  //Append the lines
  axis
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', function (d, i) {
      const multiplier = 1.1;
      return rScale(maxValue * multiplier) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('y2', function (d, i) {
      const multiplier = 1.1;
      return rScale(maxValue * multiplier) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .attr('class', 'line')
    .style('stroke', 'white')
    .style('stroke-width', '2px');

  //Append the labels at each axis
  axis
    .append('text')
    .attr('class', 'legend')
    .style('font-size', '11px')
    .attr('text-anchor', 'middle')
    .attr('dy', '0.35em')
    .attr('x', function (d, i) {
      return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('y', function (d, i) {
      return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .text(function (d) {
      return d;
    })
    .call(wrap, cfg.wrapWidth);

  /////////////////////////////////////////////////////////
  ///////////// Draw the radar chart blobs ////////////////
  /////////////////////////////////////////////////////////

  //The radial line function
  const radarLine = d3
    .lineRadial<IRadarChartDataNode>()
    .radius(function (d) {
      return rScale(d.value);
    })
    .angle(function (d, i) {
      return i * angleSlice;
    });

  //Create a wrapper for the blobs
  const blobWrapper = g
    .selectAll('.radarWrapper')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'radarWrapper');

  //Append the backgrounds
  blobWrapper
    .append('path')
    .attr('class', 'radarArea')
    .attr('d', function (d, i) {
      return radarLine(d);
    })
    .style('fill', function (d, i) {
      return cfg.color(i.toString());
    })
    .style('fill-opacity', cfg.opacityArea)
    .on('mouseover', function (d, i) {
      // Dim all blobs
      const radarAreaFillOpacity = 0.1;
      d3.selectAll('.radarArea')
        .transition()
        .duration(transitionDuration)
        .style('fill-opacity', radarAreaFillOpacity);
      // Bring back the hovered over blob
      const fillOpacity = 0.7;
      d3.select(this).transition().duration(transitionDuration).style('fill-opacity', fillOpacity);
    })
    .on('mouseout', function () {
      // Bring back all blobs
      d3.selectAll('.radarArea')
        .transition()
        .duration(transitionDuration)
        .style('fill-opacity', cfg.opacityArea);
    });

  //Create the outlines
  blobWrapper
    .append('path')
    .attr('class', 'radarStroke')
    .attr('d', function (d, i) {
      return radarLine(d);
    })
    .style('stroke-width', `${cfg.strokeWidth}px`)
    .style('stroke', function (d, i) {
      return cfg.color(i.toString());
    })
    .style('fill', 'none')
    .style('filter', 'url(#glow)');

  //Append the circles
  const blobWrapperFillOpacity = 0.8;
  blobWrapper
    .selectAll('.radarCircle')
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append('circle')
    .attr('class', 'radarCircle')
    .attr('r', cfg.dotRadius)
    .attr('cx', function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('cy', function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style('fill', function (d, i, j) {
      return cfg.color(j.toString());
    })
    .style('fill-opacity', blobWrapperFillOpacity);

  /////////////////////////////////////////////////////////
  //////// Append invisible circles for tooltip ///////////
  /////////////////////////////////////////////////////////

  //Wrapper for the invisible circles on top
  const blobCircleWrapper = g
    .selectAll('.radarCircleWrapper')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'radarCircleWrapper');

  //Set up the small tooltip for when you hover over a circle
  const tooltip = g.append('text').attr('class', 'tooltip').style('opacity', 0);

  //Append a set of invisible circles on top for the mouseover pop-up
  const blobCircleWrapperRadiusMultiplier = 1.5;
  blobCircleWrapper
    .selectAll<SVGElement, IRadarChartDataNode>('.radarInvisibleCircle')
    .data(function (d, i) {
      return d;
    })
    .enter()
    .append('circle')
    .attr('class', 'radarInvisibleCircle')
    .attr('r', cfg.dotRadius * blobCircleWrapperRadiusMultiplier)
    .attr('cx', function (d, i) {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
    })
    .attr('cy', function (d, i) {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
    })
    .style('fill', 'none')
    .style('pointer-events', 'all')
    .on('mouseover', function (d: { value: number }, i) {
      const modifier = 10;
      const newX = parseFloat(d3.select(this).attr('cx')) - modifier;
      const newY = parseFloat(d3.select(this).attr('cy')) - modifier;

      tooltip
        .attr('x', newX)
        .attr('y', newY)
        .text(d3Format(d.value))
        .transition()
        .duration(transitionDuration)
        .style('opacity', 1);
    })
    .on('mouseout', function () {
      tooltip.transition().duration(transitionDuration).style('opacity', 0);
    });
};

/////////////////////////////////////////////////////////
/////////////////// Helper Function /////////////////////
/////////////////////////////////////////////////////////

//Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text
function wrap(svgText: d3.Selection<SVGTextElement, string, SVGGElement, unknown>, width: number) {
  svgText.each(function () {
    const text = d3.select<SVGElement, string>(this);
    const words = text.text().split(/\s+/).reverse();
    let word: string | undefined;
    let line: string[] = [];
    let lineNumber = 0;
    const lineHeight = 1.4; // ems
    const y = text.attr('y');
    const x = text.attr('x');
    const dy = parseFloat(text.attr('dy'));
    let tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', `${dy}em`);

    while (word === words.pop()) {
      line.push(word ?? '');
      tspan.text(line.join(' '));
      if ((tspan.node()?.getComputedTextLength() ?? 0) > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word ?? ''];
        lineNumber += 1;
        tspan = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', `${lineNumber * lineHeight + dy}em`)
          .text(word ?? '');
      }
    }
  });
}
