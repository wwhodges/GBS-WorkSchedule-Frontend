import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnscheduledComponent } from './pages/unscheduled/unscheduled.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupComponent } from './pages/group/group.component';
import { OrderFilterComponent } from './common/order-filter/order-filter.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReportSettingsComponent } from './pages/report-settings/report-settings.component';
import { ReportComponent } from './pages/report/report.component';
import { FileuploadComponent } from './upload/fileupload/fileupload.component';


const routes: Routes = [
  {path: 'filter', component: OrderFilterComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'group/:id', component: GroupComponent},
  {path: 'report/:reportId', component: ReportComponent },
  {path: 'reports', component: ReportsComponent},
  {path: 'report-settings/:id', component: ReportSettingsComponent},
  {path: 'profile', component: UserProfileComponent },
  {path: 'unscheduled', component: UnscheduledComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'search/:terms', component: SearchComponent },
  {path: 'search', component: SearchComponent },
  {path: 'order/:id', component: OrderdetailComponent },
  {path: 'upload', component: FileuploadComponent },
  {path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
