import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OptionsService } from '@c8y/ngx-components';
import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  KPI_AGGREGAOR_WIDGET_ORDER_OPTIONS,
  KPI_AGGREGAOR_WIDGET__CHART_LEGEND_POSITION_OPTIONS,
  KPI_AGGREGAOR_WIDGET__DISPLAY_OPTIONS,
  KPI_AGGREGAOR_WIDGET__SORT_OPTIONS
} from '@widget/models/kpi-aggregator-widget.const';
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

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      // 1. request
      fieldGroup: [
        {
          key: 'query',
          type: 'input',
          props: {
            label: 'Query',
            placeholder: '(kpi_Group.groupId eq [kpi_GroupRefernce]) and has(c8y_IsDevice)',
            required: true,
            description:
              'Placeholders can be used to set query parameters based on the dashboards asset, e.g. <code>[kpi_fragment]</code>.'
          }
        },
        {
          key: 'pageSize',
          type: 'number',
          props: {
            label: 'Page Size',
            min: 1,
            max: 2000,
            step: 250,
            placeholder: '500'
          }
        },
        {
          key: 'pageLimit',
          type: 'number',
          props: {
            label: 'Page Limit',
            min: 1,
            step: 1,
            placeholder: '3'
          }
        },
        {
          key: 'parallelRequests',
          type: 'number',
          props: {
            label: 'Number of parallel requests',
            min: 1,
            max: 10,
            step: 1,
            placeholder: '1'
          }
        }
      ]
    },
    {
      // 2. view
      fieldGroup: [
        {
          key: 'display',
          type: 'select',
          props: {
            label: 'Display Mode',
            options: KPI_AGGREGAOR_WIDGET__DISPLAY_OPTIONS
          }
        },
        {
          key: 'kpiFragment',
          type: 'input',
          props: {
            label: 'KPI Fragment',
            placeholder: 'c8y_ActiveAlarmsStatus.major'
          },
          expressions: {
            hide: 'model.display == "list"'
          }
        },
        {
          key: 'groupBy',
          type: 'input',
          props: {
            label: 'Group By',
            placeholder: 'c8y_Hardware.model'
          },
          expressions: {
            hide: 'model.display == "list"'
          }
        },
        {
          key: 'label',
          type: 'input',
          props: {
            label: 'Label',
            placeholder: 'type'
          },
          expressions: {
            hide: 'model.display != "aggregate" && model.display != "pieAggregate"'
          }
        },
        {
          key: 'sort',
          type: 'select',
          props: {
            label: 'Sort By',
            options: KPI_AGGREGAOR_WIDGET__SORT_OPTIONS
          },
          expressions: {
            hide: 'model.display == "pieCount" || model.display == "pieAggregate"'
          }
        },
        {
          key: 'order',
          type: 'select',
          props: {
            label: 'Order By',
            options: KPI_AGGREGAOR_WIDGET_ORDER_OPTIONS
          },
          expressions: {
            hide: 'model.display == "pieCount" || model.display == "pieAggregate"'
          }
        }
      ]
    },
    {
      // 3. style
      expressions: {
        hide: 'model.display == "list"'
      },
      fieldGroup: [
        {
          key: 'chartLegendPosition',
          type: 'select',
          props: {
            label: 'Chart Legend Position',
            options: KPI_AGGREGAOR_WIDGET__CHART_LEGEND_POSITION_OPTIONS
          },
          expressions: {
            hide: 'model.display != "pieCount" && model.display != "pieAggregate"'
          }
        },
        {
          fieldGroupClassName: 'row',
          fieldGroup: [
            {
              key: 'color',
              type: 'input',
              className: 'col-md-9',
              props: {
                label: 'Background Color',
                placeholder: '#00584d',
                type: 'color'
              },
              expressions: {
                hide: 'model.display == "pieCount" || model.display == "pieAggregate"'
              }
            },
            {
              key: 'opacity',
              type: 'number',
              className: 'col-md-3',
              props: {
                label: 'Background Opacity',
                min: 0,
                max: 100,
                step: 10,
                placeholder: '30',
                addonRight: {
                  text: '%'
                }
              },
              expressions: {
                hide: 'model.display == "pieCount" || model.display == "pieAggregate"'
              }
            }
          ]
        }
      ]
    },
    {
      // 4. misc
      fieldGroup: [
        {
          key: 'percent',
          type: 'checkbox',
          props: {
            label: 'Percent'
          },
          expressions: {
            hide: 'model.display == "pieCount" || model.display == "pieAggregate" || model.display == "list"'
          }
        },
        {
          key: 'showMeta',
          type: 'switch',
          props: {
            label: 'Show Meta Info'
          }
        },
        {
          key: 'runOnLoad',
          type: 'checkbox',
          props: {
            label: 'Run on Load'
          }
        }
      ]
    }
  ];

  private defaultConfig: KpiAggregatorWidgetConfig = {
    query: '',
    pageSize: 100,
    pageLimit: 3,
    groupBy: '',
    label: '',
    kpiFragment: '',
    color: '#27b3ce',
    opacity: 30,
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
    this.setTenantConfigs();
    this.setDefaultValues();
  }

  private setTenantConfigs() {
    // override default with branding
    if (has(this.optionsService.brandingCssVars, 'brand-primary')) {
      this.defaultConfig.color = this.optionsService.brandingCssVars['brand-primary'];
    }
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
