import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapComponent, CoreModule, RouterModule } from '@c8y/ngx-components';
import { CockpitDashboardModule } from '@c8y/ngx-components/context-dashboard';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    CoreModule.forRoot(),
    CockpitDashboardModule,
    NgChartsModule.forRoot()
  ],
  bootstrap: [BootstrapComponent]
})
export class AppModule {}
