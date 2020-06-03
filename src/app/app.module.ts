import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { ChartsModule } from 'ng2-charts';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { Ng2CompleterModule } from 'ng2-completer';
import { ToastrModule } from 'ngx-toastr';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActiveUserService } from './common/services/activeUser.service';
import { ApiDataService } from './common/services/apiData.service';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { NavbarUIComponent } from './navigation/navbar/navbarUI.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnscheduledComponent } from './pages/unscheduled/unscheduled.component';
import { SearchComponent } from './pages/search/search.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { LoadingComponent } from './common/loading/loading.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupComponent } from './pages/group/group.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { OrderTableComponent } from './common/order-table/order-table.component';
import { SetupUserService } from './common/services/setup-user.service';
import { LoaderComponent } from './common/loader/loader.component';
import { LoaderWrapperComponent } from './common/loader-wrapper/loader-wrapper.component';
import { MultiSelectComponent } from './common/multiselect/multiselect.component';
import { OrderFilterComponent } from './common/order-filter/order-filter.component';
import { OrderFilterStorage } from './common/services/orderFilterStorage.service';
import { ReportsComponent } from './pages/reports/reports.component';
import { ReportSettingsComponent } from './pages/report-settings/report-settings.component';
import { ReportComponent } from './pages/report/report.component';
import { FileuploadComponent } from './upload/fileupload/fileupload.component';

export function SetupUser(setup: SetupUserService) {
  return () => setup.initialise();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarUIComponent,
    DashboardComponent,
    UnscheduledComponent,
    SearchComponent,
    OrderdetailComponent,
    LoadingComponent,
    UserProfileComponent,
    ScheduleComponent,
    GroupsComponent,
    GroupComponent,
    ReportComponent,
    ReportsComponent,
    ReportSettingsComponent,
    PaginationComponent,
    OrderTableComponent,
    LoaderComponent,
    LoaderWrapperComponent,
    MultiSelectComponent,
    OrderFilterComponent,
    FileuploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    Ng2CompleterModule,
    ToastrModule.forRoot(),
    DragDropModule
  ],
  providers: [
    SetupUserService,
    {
      provide: APP_INITIALIZER,
      useFactory: SetupUser,
      deps: [SetupUserService],
      multi: true
    },
    ActiveUserService,
    ApiDataService,
    OrderFilterStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
