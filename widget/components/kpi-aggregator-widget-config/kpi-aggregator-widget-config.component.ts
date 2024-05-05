import { Component, Input, OnInit } from '@angular/core';
import { OptionsService } from '@c8y/ngx-components';
import { has } from 'lodash';
import {
  KpiAggregatorWidgetConfig,
  KpiAggregatorWidgetDisplay,
  KpiAggregatorWidgetOrder,
  KpiAggregatorWidgetSort
} from '../../models/kpi-aggregator-widget.model';

@Component({
  selector: 'c8y-kpi-aggregator-widget-config',
  templateUrl: './kpi-aggregator-widget-config.component.html',
  styleUrls: ['kpi-aggregator-widget-config.component.less']
})
export class KpiAggregatorWidgetConfigComponent implements OnInit {
  @Input() config: KpiAggregatorWidgetConfig;

  set opacity(opacity: number) {
    this.config.opacity = opacity / 100;
  }
  get opacity(): number {
    return this.config.opacity * 100;
  }

  displayOptions = Object.keys(KpiAggregatorWidgetDisplay);

  sortOptions = Object.keys(KpiAggregatorWidgetSort);

  orderOptions = Object.keys(KpiAggregatorWidgetOrder);

  private defaultConfig = {
    query: '',
    pageSize: 100,
    pageLimit: 3,
    groupBy: '',
    label: '',
    kpiFragment: '',
    color: '#27b3ce',
    opacity: 0.3,
    showMeta: true,
    display: KpiAggregatorWidgetDisplay.aggregate,
    sort: KpiAggregatorWidgetSort.value,
    order: KpiAggregatorWidgetOrder.desc,
    percent: false,
    runOnLoad: false,
    parallelRequests: 1,
    chartLegendPosition: 'top'
  };

  constructor(private optionsService: OptionsService) {}

  ngOnInit(): void {
    // override default with branding
    if (has(this.optionsService.brandingCssVars, 'brand-primary')) {
      this.defaultConfig.color = this.optionsService.brandingCssVars['brand-primary'];
    }

    this.setDefaultValues();
  }

  private setDefaultValues() {
    // make sure alle defaults are present, eg after updates
    const keys = Object.keys(this.defaultConfig);

    keys.forEach((key) => {
      if (!this.config[key] && typeof this.config[key] !== 'boolean' && this.config[key] !== 0) {
        this.config[key] = this.defaultConfig[key];
      }
    });
  }
}
