import { Component, Input, OnInit } from '@angular/core';
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
    color: '#00584d', // TODO get from tenant config; primary color
    opacity: 0.3,
    showMeta: true,
    display: KpiAggregatorWidgetDisplay.aggregate,
    sort: KpiAggregatorWidgetSort.value,
    order: KpiAggregatorWidgetOrder.desc,
    percent: false,
    runOnLoad: false
  };

  ngOnInit(): void {
    this.setDefaultValues();
  }

  private setDefaultValues() {
    const keys = Object.keys(this.defaultConfig);

    keys.forEach((key) => {
      if(!this.config[key] && typeof this.config[key] !== 'boolean' && this.config[key] !== 0) {
        this.config[key] = this.defaultConfig[key];
      }
    });
  }
}
