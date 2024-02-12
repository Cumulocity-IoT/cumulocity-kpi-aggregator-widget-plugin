import { Component, Input } from '@angular/core';
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
export class KpiAggregatorWidgetConfigComponent {
  @Input() config: KpiAggregatorWidgetConfig = {
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
    order: KpiAggregatorWidgetOrder.asc,
    percent: true,
    runOnLoad: true
  };

  displayOptions = Object.keys(KpiAggregatorWidgetDisplay);

  sortOptions = Object.keys(KpiAggregatorWidgetSort);

  orderOptions = Object.keys(KpiAggregatorWidgetOrder);
}
