import { KpiAggregatorWidgetOptions } from './kpi-aggregator-widget.model';

// select options
export const KPI_AGGREGAOR_WIDGET__DISPLAY_OPTIONS: KpiAggregatorWidgetOptions[] = [
  { value: 'aggregate', label: 'Bar Chart: Aggregate Values', group: '📊 Bar Chart' },
  { value: 'count', label: 'Bar Chart: Count Entries', group: '📊 Bar Chart' },
  { value: 'pieAggregate', label: 'Pie Chart: Aggregate Values', group: '🍰 Pie Chart' },
  { value: 'pieCount', label: 'Pie Chart: Count Entries', group: '🍰 Pie Chart' },
  { value: 'list', label: 'Table' }
];

// sort options
export const KPI_AGGREGAOR_WIDGET__SORT_OPTIONS: KpiAggregatorWidgetOptions[] = [
  { value: 'label', label: 'by Label' },
  { value: 'value', label: 'by Value' }
];

// order options
export const KPI_AGGREGAOR_WIDGET_ORDER_OPTIONS: KpiAggregatorWidgetOptions[] = [
  { value: 'asc', label: '↗️ Ascending' },
  { value: 'desc', label: '↘️ Descending' }
];

// chart legend position options
export const KPI_AGGREGAOR_WIDGET__CHART_LEGEND_POSITION_OPTIONS: KpiAggregatorWidgetOptions[] = [
  { value: 'top', label: '⬆️ Top' },
  { value: 'right', label: '➡️ Right' },
  { value: 'bottom', label: '⬇️ Bottom' },
  { value: 'left', label: '⬅️ Left' }
];
