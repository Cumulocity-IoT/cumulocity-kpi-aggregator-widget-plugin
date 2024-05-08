import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapComponent, CoreModule, RouterModule } from '@c8y/ngx-components';
import { CockpitDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { FormlyModule } from '@ngx-formly/core';
import { KpiAggregatorWidgetPluginModule } from '@widget/kpi-aggregator-widget.module';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    CoreModule.forRoot(),
    CockpitDashboardModule,
    NgChartsModule.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    KpiAggregatorWidgetPluginModule
  ],
  declarations: [],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
