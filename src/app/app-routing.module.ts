import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DespatchedComponent } from './pages/despatched/despatched.component';
import { UnscheduledComponent } from './pages/unscheduled/unscheduled.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';


const routes: Routes = [
  {path: 'despatched', component: DespatchedComponent },
  {path: 'unscheduled', component: UnscheduledComponent},
  {path: 'search/:terms', component: SearchComponent },
  {path: 'order/:id', component: OrderdetailComponent },
  {path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
