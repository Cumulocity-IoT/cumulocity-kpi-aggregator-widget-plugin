import { LayoutPosition } from 'chart.js';

export const KpiAggregatorWidgetSort = {
  label: 'label',
  value: 'value'
};
export type KpiAggregatorWidgetSort = (typeof KpiAggregatorWidgetSort)[keyof typeof KpiAggregatorWidgetSort];
export const KpiAggregatorWidgetOrder = {
  asc: 'asc',
  desc: 'desc'
};
export type KpiAggregatorWidgetOrder = (typeof KpiAggregatorWidgetOrder)[keyof typeof KpiAggregatorWidgetOrder];
export const KpiAggregatorWidgetDisplay = {
  aggregate: 'aggregate',
  count: 'count',
  list: 'list',
  pieAggregate: 'pieAggregate',
  pieCount: 'pieCount'
};
export type KpiAggregatorWidgetDisplay = (typeof KpiAggregatorWidgetDisplay)[keyof typeof KpiAggregatorWidgetDisplay];
export interface KpiAggregatorWidgetConfig {
  query: string;
  pageSize: number;
  pageLimit: number;
  color: string;
  opacity: number;
  showMeta: boolean;
  display: KpiAggregatorWidgetDisplay;
  sort: KpiAggregatorWidgetSort;
  order: KpiAggregatorWidgetOrder;
  percent: boolean;
  runOnLoad: boolean;
  parallelRequests: number;
  groupBy?: string;
  kpiFragment?: string;
  label?: string;
  chartLegendPosition?: LayoutPosition;
}
