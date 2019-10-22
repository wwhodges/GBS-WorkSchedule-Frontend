import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveUserService } from './common/activeUser.service';
import { AwsDataService } from './common/awsData.service';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { NavbarUIComponent } from './navigation/navbar/navbarUI.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DespatchedComponent } from './pages/despatched/despatched.component';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarUIComponent,
    DashboardComponent,
    DespatchedComponent,
    PieChartComponent,
    BarChartComponent,
    UnscheduledComponent,
    SearchComponent,
    OrderdetailComponent,
    WorkTableComponent,
    LoadingComponent,
    WorkFilterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ActiveUserService,
    AwsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
