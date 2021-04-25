import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  IForceDirectedChartData,
  IForceDirectedChartDataNode,
  IRadarChartDataNode,
} from '@mono/client-d3-charts';
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

  // eslint-disable-next-line max-lines-per-function -- TODO: tech debt
  public get forceDirectedChartData() {
    const dataMock = [
      {
        id: '1',
        link: 'https://www.domain1.dummy/link1',
        author: {
          username: 'username 1',
          picture: 'https://image.flaticon.com/icons/svg/145/145867.svg',
          userId: '1',
        },
      },
      {
        id: '2',
        link: 'https://www.domain2.dummy/link2',
        author: {
          username: 'username 2',
          picture: 'https://image.flaticon.com/icons/svg/145/145852.svg',
          userId: '2',
        },
      },
      {
        id: '3',
        link: 'https://www.domain3.dummy/link3',
        author: {
          username: 'username 3',
          picture: 'https://image.flaticon.com/icons/svg/145/145859.svg',
          userId: '3',
        },
      },
      {
        id: '4',
        link: 'https://www.domain4.dummy/link2',
        author: {
          username: 'username 4',
          picture: 'https://image.flaticon.com/icons/svg/145/145862.svg',
          userId: '4',
        },
      },
      {
        id: '5',
        link: 'https://www.domain3.dummy/link3',
        author: {
          username: 'username 2',
          picture: 'https://image.flaticon.com/icons/svg/145/145852.svg',
          userId: '2',
        },
      },
    ];
    const domains: IForceDirectedChartData['domains'] = [];
    let uniqueDomCounter = 0;
    const domainArrCheckDupl: string[] = [];
    const entities: IForceDirectedChartData['entities'] = [];
    let uniqueUsrsCounter = 0;
    const entitiesArrCheckDupl: string[] = [];
    const links: IForceDirectedChartData['links'] = [];
    for (let i = 0; i < dataMock.length; i += 1) {
      let domain = '';
      const domainValue = 1;
      const domArr = dataMock[i].link.split('/');
      if (dataMock[i].link.includes('://')) {
        domain = domArr[2];
      } else {
        domain = domArr[0];
      }
      if (domain.includes('www.')) {
        const start = 4;
        domain = domain.substr(start, domain.length);
      }
      const domId = domainArrCheckDupl.indexOf(domain);
      let tempDomIndex = 0;
      if (domId !== -1) {
        domains[domId].value += 1;
        tempDomIndex = domId;
      } else {
        domainArrCheckDupl.push(domain);
        domains.push({ index: uniqueDomCounter, domain: domain, value: domainValue });
        tempDomIndex = uniqueDomCounter;
        uniqueDomCounter += 1;
      }
      const usrId = entitiesArrCheckDupl.indexOf(dataMock[i].author.username);
      if (usrId !== -1) {
        entities[usrId].linksCount += 1;
        links.push({ source: entities[usrId].index, target: tempDomIndex });
      } else {
        entitiesArrCheckDupl.push(dataMock[i].author.username);
        entities.push({
          index: uniqueUsrsCounter,
          name: dataMock[i].author.username,
          img: dataMock[i].author.picture,
          linksCount: 1,
        });
        links.push({ source: uniqueUsrsCounter, target: tempDomIndex });
        uniqueUsrsCounter += 1;
      }
    }
    const nodes: IForceDirectedChartDataNode[] = [];
    for (let i = 0; i < domains.length; i += 1) {
      nodes.push(domains[i]);
    }
    for (let i = 0; i < entities.length; i += 1) {
      for (let l = 0; l < links.length; l += 1) {
        if (links[l].source === entities[i].index) {
          links[l].source = domains.length + i;
        }
      }
      entities[i].index = domains.length + i;
      nodes.push(entities[i]);
    }
    return {
      domains,
      entities,
      links,
      nodes,
    };
  }
}
