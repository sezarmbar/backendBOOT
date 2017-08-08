import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { ServiceAppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';

import {
  HeaderComponent
} from './component';

import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdCoreModule,
  MdDatepickerModule,
  MdDialogModule,
  MdExpansionModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdPaginatorModule,
  MdProgressBarModule,
  MdProgressSpinnerModule,
  MdRadioModule,
  MdRippleModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSlideToggleModule,
  MdSnackBarModule,
  MdSortModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule,
  MdTooltipModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
// service
import { RatingPageComponent, RatingService,  DialogReviewEnter, AdminRatingPageComponent } from './pages/rating';
import { CreateRatingComponent } from './pages/rating/admin-rating-page/create-rating/create-rating.component';
import { RatingInfoComponent, RatingDeleteDialog } from './pages/rating/admin-rating-page/rating-info/rating-info.component';
import { RatingChartComponent } from './pages/rating/admin-rating-page/rating-info/rating-chart/rating-chart.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import {
  ApiService2,
  AuthService,
  UserService,
  FooService,
  ConfigService
} from './service';
import { LoginComponent } from './login';

import { LoginGuard, AdminPage } from './guard';
import { HomeComponent } from './home/home.component';
export function initUserFactory(userService: UserService) {
    return () => userService.initUser();
}
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateUsersComponent } from './pages/create-users';
import { CreateFormComponent } from './pages/create-users/create-form/create-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RatingPageComponent,
    AdminRatingPageComponent,
    DialogReviewEnter,
    RatingDeleteDialog,
    CreateRatingComponent,
    RatingInfoComponent,
    RatingChartComponent,
    HeaderComponent,
    ErrorPageComponent,
    LoginComponent,
    HomeComponent,
    CreateUsersComponent,
    CreateFormComponent
  ],
  entryComponents: [RatingDeleteDialog, DialogReviewEnter],
  providers: [RatingService,  ApiService2, LoginGuard,
    AuthService,
    AdminPage,
    UserService,
    FooService,
    ConfigService,
    {
      'provide': APP_INITIALIZER,
      'useFactory': initUserFactory,
      'deps': [UserService],
      'multi': true
    }
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdNativeDateModule,
    ReactiveFormsModule,
    NgxChartsModule,
    ServiceAppRoutingModule,
    JsonpModule,
    CdkTableModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    FlexLayoutModule
  ]
})
export class AppModule { }
