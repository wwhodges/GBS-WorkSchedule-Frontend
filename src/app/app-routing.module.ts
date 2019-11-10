import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnscheduledComponent } from './pages/unscheduled/unscheduled.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';


const routes: Routes = [
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
