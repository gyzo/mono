import * as d3 from 'd3';

export interface IForceDirectedGraphDomain {
  index: number;
  domain: string;
  value: number;
}

export interface IForceDirectedGraphEntity {
  index: number;
  name: string;
  img: string;
  linksCount: number;
}

export interface IForceDirectedChartDataNode extends d3.SimulationNodeDatum {
  index: number;
  domain?: string;
  value?: number;
  username?: string;
  pic?: string;
  linksCount?: number;
}

export interface IForceDirectedChartData {
  domains: IForceDirectedGraphDomain[];
  entities: IForceDirectedGraphEntity[];
  links: d3.SimulationLinkDatum<IForceDirectedChartDataNode>[];
  nodes: IForceDirectedChartDataNode[];
}

export interface IDrawForceDirectedChartOptions {
  w: number;
  h: number;
  charge: number;
  distance: number;
  fontSize: number;
  collisionRadius: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  strokeWidth: number;
  color: d3.ScaleOrdinal<string, string>;
}
