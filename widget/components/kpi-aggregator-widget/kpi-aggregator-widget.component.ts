import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IManagedObject, InventoryService, Paging } from '@c8y/client';
import { cloneDeep, has, sortBy } from 'lodash';
import {
  KpiAggregatorWidgetConfig,
  KpiAggregatorWidgetDisplay,
  KpiAggregatorWidgetOrder
} from '../../models/kpi-aggregator-widget.model';

interface AssetGroup {
  key: string;
  label: string;
  value: number | string;
  objects: IManagedObject[];
}

@Component({
  selector: 'c8y-kpi-aggregator-widget',
  templateUrl: './kpi-aggregator-widget.component.html',
  styleUrls: ['./kpi-aggregator-widget.component.less']
})
export class KpiAggregatorWidgetComponent implements OnInit {
  @Input() config: KpiAggregatorWidgetConfig;

  loading = false;
  asset: IManagedObject;
  assetGroups: AssetGroup[];
  max = 0;
  total = 0;
  results = 0;
  paging: Paging<IManagedObject>;

  // benchmarking
  timestampEnd: Date;
  timestampStart: Date;
  duration: string;

  constructor(private activatedRoute: ActivatedRoute, private inventoryService: InventoryService) {
    this.asset = this.getAssetFromContext(this.activatedRoute.snapshot);
  }

  ngOnInit(): void {
    if (this.config.runOnLoad) {
      void this.loadData();
    }
  }

  async loadData(): Promise<void> {
    this.loading = true;
    this.timestampStart = new Date();
    this.assetGroups = this.digestAssets(await this.fetchAssets());
    this.setMinMax(this.assetGroups);
    this.loading = false;
  }

  private async fetchAssets(page = 1): Promise<IManagedObject[]> {
    const response = await this.inventoryService.list({
      query: this.buildQuery(),
      pageSize: this.config.pageSize,
      currentPage: page,
      withTotalPages: page === 1
    });
    const limit =
      typeof this.config.pageLimit !== 'number' || this.config.pageLimit <= 0 ? 10000 : this.config.pageLimit;
    let assets = response.data;

    if (response.paging && page === 1) {
      this.paging = response.paging;
    }
    this.paging.currentPage = page;
    this.timestampEnd = new Date();
    this.results = page * this.config.pageSize;
    this.duration = this.calcQueryDuration();

    if (page < this.paging.totalPages && page + 1 < limit) {
      assets = [...assets, ...(await this.fetchAssets(page + 1))];
    }

    this.results = assets.length;

    return assets;
  }

  private buildQuery(): string {
    let query = this.config.query;
    let replacement;
    const match = query.match(/\[([\w.]{1,})\]/i);

    if (this.asset && match) {
      match.forEach((m) => {
        replacement = this.getPathData<string>(this.asset, m);

        if (replacement) {
          query = query.replace(`[${m}]`, replacement as string);
        }
      });
    }

    return `$filter=${query}`;
  }

  private digestAssets(assets: IManagedObject[]): AssetGroup[] {
    const groups: AssetGroup[] = [];
    let key: string;
    let group: AssetGroup;
    let value: number | string;
    let total = 0;

    assets.forEach((asset) => {
      key =
        !!this.config.groupBy && this.config.groupBy !== ''
          ? this.getPathData<string>(asset, this.config.groupBy).toString()
          : 'undefined';
      group = groups.find((g) => g.key === key);

      if (key) {
        switch (this.config.display) {
          case KpiAggregatorWidgetDisplay.aggregate:
            value = this.getPathData<number>(asset, this.config.kpiFragment);
            total += value;

            if (typeof value === 'number') {
              if (group) {
                group.objects.push(asset);

                group.value = (group.value as number) + value;
              } else {
                groups.push({
                  key,
                  label: this.getPathData<string>(asset, this.config.label),
                  value,
                  objects: [asset]
                });
              }
            }
            break;
          case KpiAggregatorWidgetDisplay.count:
            value = this.getPathData<string>(asset, this.config.kpiFragment);
            total += 1;

            if (group) {
              group.objects.push(asset);
              group.value = (group.value as number) + 1;
            } else {
              groups.push({
                key,
                label: value,
                value: 1,
                objects: [asset]
              });
            }
            break;
          case KpiAggregatorWidgetDisplay.list:
            total += 1;

            if (group) {
              group.objects.push(asset);
              group.value = (group.value as number) + 1;
            } else {
              groups.push({
                key,
                label: '',
                value: 1,
                objects: [asset]
              });
            }
            break;
        }
      }
    });

    this.total = total;

    return this.sortGroups(groups);
  }

  private getPathData<T>(o: object, path: string): T {
    const pathPartials = path.split('.');
    let data = o;

    pathPartials.forEach((p) => {
      if (has(data, p)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        data = data[p];
      } else {
        return;
      }
    });

    if (typeof data === 'object') {
      return null;
    }

    return data as undefined as T;
  }

  private sortGroups(groups: AssetGroup[]): AssetGroup[] {
    const sorted = sortBy(groups, this.config.sort);

    return this.config.order === KpiAggregatorWidgetOrder.desc ? sorted.reverse() : sorted;
  }

  private setMinMax(groups: AssetGroup[]) {
    let max = 0;

    groups.forEach((group) => {
      if (group.value > max) {
        max = group.value as number;
      }
    });

    this.max = max;
  }

  private calcQueryDuration(): string {
    let milliseconds = this.timestampEnd.getTime() - this.timestampStart.getTime();
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    milliseconds = milliseconds % 1000;

    return `${this.padNumber(minutes)}:${this.padNumber(seconds)}.${this.padNumber(milliseconds, 3)}`;
  }

  private padNumber(num: number, padding = 2): string {
    return num.toString().padStart(padding, '0');
  }

  private getAssetFromContext(route: ActivatedRouteSnapshot, numberOfCheckedParents = 0): IManagedObject {
    let context: { contextData: IManagedObject } = undefined;

    if (route?.data?.contextData) {
      context = route.data as {
        contextData: IManagedObject;
      };
    } else if (route?.firstChild?.data?.contextData) {
      context = route.firstChild.data as {
        contextData: IManagedObject;
      };
    }

    if (context?.contextData) {
      return cloneDeep(context.contextData);
    }

    return route.parent && numberOfCheckedParents < 3
      ? this.getAssetFromContext(route.parent, numberOfCheckedParents + 1)
      : undefined;
  }
}
