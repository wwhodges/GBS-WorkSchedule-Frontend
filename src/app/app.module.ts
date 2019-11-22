import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { Ng2CompleterModule } from 'ng2-completer';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveUserService } from './common/services/activeUser.service';
import { ApiDataService } from './common/services/apiData.service';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { NavbarUIComponent } from './navigation/navbar/navbarUI.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { UnscheduledComponent } from './pages/unscheduled/unscheduled.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { WorkTableComponent } from './work/work-table/work-table.component';
import { LoadingComponent } from './common/loading/loading.component';
import { WorkFilterComponent } from './common/work-filter/work-filter.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupComponent } from './pages/group/group.component';
import { PaginationComponent } from './common/pagination/pagination.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarUIComponent,
    DashboardComponent,
    PieChartComponent,
    BarChartComponent,
    UnscheduledComponent,
    SearchComponent,
    OrderdetailComponent,
    WorkTableComponent,
    LoadingComponent,
    WorkFilterComponent,
    UserProfileComponent,
    ScheduleComponent,
    GroupsComponent,
    GroupComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ActiveUserService,
    ApiDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
