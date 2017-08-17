import { CreateRatingComponent } from './pages/rating/admin-rating-page/create-rating/create-rating.component';
import { AdminRatingPageComponent } from './pages/rating/admin-rating-page/admin-rating-page.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingPageComponent } from './pages/rating/rating-page/rating-page.component';



import { ErrorPageComponent } from './pages/error-page';
import { HelpeComponent } from './pages/helpe/helpe.component';
import { LoginComponent } from './login';
import { LoginGuard, AdminPage, CreateUserPage } from './guard';
import { CreateUsersComponent } from './pages/create-users';

const routes: Routes = [
    { path: 'r/:id', component: RatingPageComponent },
    { path: '404', component: ErrorPageComponent },
    { path: 'home', component: HomeComponent  },
    { path: 'helpe', component: HelpeComponent , canActivate: [AdminPage]  },
    { path: '', redirectTo:'login', pathMatch: 'full', canActivate: [AdminPage] },
    { path: 'createRating', component: CreateRatingComponent, canActivate: [AdminPage] },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'admin', component: AdminRatingPageComponent, canActivate: [AdminPage] },
    { path: 'creatUsers', component: CreateUsersComponent, canActivate: [CreateUserPage] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
    providers: []
})
export class ServiceAppRoutingModule { }
