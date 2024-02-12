import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoreModule, hookComponent } from '@c8y/ngx-components';
import { KpiAggregatorWidgetConfigComponent } from './components/kpi-aggregator-widget-config/kpi-aggregator-widget-config.component';
import { KpiAggregatorWidgetComponent } from './components/kpi-aggregator-widget/kpi-aggregator-widget.component';

@NgModule({
  imports: [CommonModule, CoreModule, FormsModule],
  declarations: [
    KpiAggregatorWidgetComponent,
    KpiAggregatorWidgetConfigComponent,
  ],
  entryComponents: [KpiAggregatorWidgetComponent],
  providers: [
    hookComponent({
      id: 'dynamic-kpi.widget',
      label: 'Dynamic KPI Widget',
      description: '',
      component: KpiAggregatorWidgetComponent,
      configComponent: KpiAggregatorWidgetConfigComponent,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      // previewImage: require('./assets/list-widget.png'),
      data: {
        settings: {
          noNewWidgets: false,
          ng1: {
            options: {
              noDeviceTarget: true,
              groupsSelectable: true,
            },
          },
        },
      },
    }),
  ],
})
export class KpiAggregatorWidgetPluginModule {}
