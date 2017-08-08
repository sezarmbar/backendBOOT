import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingPageComponent, AdminRatingPageComponent } from './pages/rating';

import { ErrorPageComponent } from './pages/error-page';
import { LoginComponent } from './login';
import { LoginGuard, AdminPage } from './guard';
import { CreateUsersComponent } from "./pages/create-users";

const routes: Routes = [
    { path: 'r/:id', component: RatingPageComponent },
    { path: '404', component: ErrorPageComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'admin', component: AdminRatingPageComponent, canActivate: [AdminPage] },
    { path: 'creatUsers', component: CreateUsersComponent },
    

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class ServiceAppRoutingModule { }
