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


const routes: Routes = [
  {path: 'filtertest', component: OrderFilterComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'group/:id', component: GroupComponent},
  {path: 'profile', component: UserProfileComponent },
  {path: 'unscheduled', component: UnscheduledComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'search/:terms', component: SearchComponent },
  {path: 'order/:id', component: OrderdetailComponent },
  {path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
