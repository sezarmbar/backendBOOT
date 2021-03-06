import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingPageComponent,CreateRatingComponent, AdminRatingPageComponent } from './pages/rating';

import { ErrorPageComponent } from './pages/error-page';
import { LoginComponent } from './login';
import { LoginGuard, AdminPage,CreateUserPage } from './guard';
import { CreateUsersComponent } from "./pages/create-users";

const routes: Routes = [
    { path: 'r/:id', component: RatingPageComponent },
    { path: '404', component: ErrorPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'createRating', component: CreateRatingComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'admin', component: AdminRatingPageComponent, canActivate: [AdminPage] },
    { path: 'creatUsers', component: CreateUsersComponent ,canActivate:[CreateUserPage]},
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class ServiceAppRoutingModule { }
