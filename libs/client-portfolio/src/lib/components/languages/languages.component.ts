import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IForceDirectedChartData, IForceDirectedChartDataNode } from '@mono/client-d3-charts';
import { IGithubRepoLanguages, IGithubRepoLanguagesRate, IGithubUserRepo, IUserConfig } from '@mono/client-store';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface IInputChanges {
  githubLanguages?: SimpleChange;
  githubLanguagesKeys?: SimpleChange;
  githubLanguagesRate?: SimpleChange;
  githubRepos?: SimpleChange;
  userConfig?: SimpleChange;
}

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioLanguagesComponent implements OnChanges {
  @Input() public githubLanguages?: IGithubRepoLanguages;

  @Input() public githubLanguagesKeys: string[] = [];

  @Input() public githubLanguagesRate?: IGithubRepoLanguagesRate;

  @Input() public githubRepos: IGithubUserRepo[] = [];

  @Input() public userConfig: IUserConfig = {
    apps: [],
    languageIcons: [],
    profiles: [],
    username: {},
  };

  private readonly changesSubject = new BehaviorSubject<null>(null);

  public readonly languageIcons$: Observable<{ url: SafeResourceUrl; key: string }[] | null> = this.changesSubject.asObservable().pipe(
    map(() => {
      const result: { url: SafeResourceUrl; key: string }[] = [];
      for (const key of this.githubLanguagesKeys) {
        const icon = this.userConfig.languageIcons.find(item => item.name === key)?.icon ?? '';
        const url = this.domSanitizer.bypassSecurityTrustUrl(icon);
        const obj = { key, url };
        result.push(obj);
      }
      return result.length > 0 ? result : null;
    }),
  );

  constructor(private readonly domSanitizer: DomSanitizer) {}

  public ngOnChanges(changes: IInputChanges): void {
    this.changesSubject.next(null);
  }

  public get forceDirectedChartData() {
    const domains: IForceDirectedChartData['domains'] = this.githubLanguagesKeys.map((domain, index) => ({ index, domain, value: 1 }));
    const entities: IForceDirectedChartData['entities'] = [...this.userConfig.apps].map((app, index) => ({
      index: index,
      name: app.name,
      img: app.imgRef,
      linksCount: 0,
    }));
    const links: IForceDirectedChartData['links'] = [...this.userConfig.apps]
      .map(app => {
        const source = entities.findIndex(value => value.name === app.name);
        const repoData = this.githubRepos.find(item => item.html_url === app.urls.repo);
        const target = domains.findIndex(value => value.domain === repoData?.language);
        const link = { source, target };
        return link;
      })
      .filter(link => typeof link.target === 'undefined');
    const nodes: IForceDirectedChartDataNode[] = [...domains, ...entities];
    const chartData = {
      domains,
      entities,
      links,
      nodes,
    };
    return chartData;
  }
}
