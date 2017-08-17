import { Rating } from './../rating/model/rating';
import { RatingService } from './../../service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { User } from './';
import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserService, ApiService2, ConfigService } from '../../service';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})

export class CreateUsersComponent implements OnInit {

  @ViewChild(EditUserComponent) editUser: EditUserComponent;
  curentUser: User;
  showCreateForm = true;
  allUsers: User[];
  allRating: Rating[];
  ratingsArray = [];
  statusCode: string;
  userSelfRatings;

  constructor(private userServie: UserService,
    private apiService: ApiService2,
    private ratingService: RatingService,
    private config: ConfigService) {
  }

  ngOnInit() {
    this.getAllUsers();
  }


  createUser(user: User) {
    const user1 = JSON.stringify(user);
    return this.apiService.createUser(this.config.registration_url, user1).subscribe((success) => {
      this.getAllUsers();
    }, (errorCode) => console.log(errorCode));
  }

  getAllUsers() {
    this.apiService.getAllUsers(this.config.users_url).subscribe((data) => {
      this.allUsers = data;
    }, (error) => console.log(error));
  }

  getUser(user: User) {
    this.ratingsArray = [];
    this.curentUser = user;
    this.getAllRating();
    this.showCreateForm = false;
    setTimeout(() => {
      this.editUser.isAdmin();
    }, 1);
    this.getUserRatings(user.username);

  }

  getAllRating() {
    this
      .ratingService
      .getAllRatings()
      .subscribe((data) => {
        this.allRating = data;
        // tslint:disable-next-line:forin
        for (const rating of this.allRating) {
          this.ratingsArray.push(rating.nameOfRat);
        }
      }, (errorCode) => this.statusCode = errorCode);
  }

  getUserRatings(userName) {
    this.apiService.getUserRating(this.config.user_rating_url, userName)
      .subscribe((data) => this.userSelfRatings = data, (error) => console.log(error));
  }

  putUserRating(userRating: UserRating) {
    this.apiService.putUserRating(this.config.user_rating_url, userRating)
      .subscribe(() => this.getUserRatings(userRating.userName), (error) => console.log(error));
  }

  deleteUserRating(userRating: UserRating) {
    this.apiService.deleteUser_(this.config.user_rating_url, userRating)
      .subscribe(() => this.getUserRatings(userRating.userName), (error) => console.log(error));
  }
  deleteUser(user: User) {
    this.apiService.deleteUser_(this.config.user_url, user)
      .subscribe(() => { this.editUser.succesMessage('Benutzer' + user.username + ': ' + 'gelöscht');
                         this.showCreateForm = true;
                         this.getAllUsers(); }
      , (error) => console.log(error));
  }
  updateUser(user: User) {
    const userString = JSON.stringify(user);
    return this.apiService.updateUser(this.config.user_update_url, userString).subscribe((success) => {
      this.getAllUsers();
      this.editUser.succesMessage('Benutzer' + user.username + ': ' + ' aktualisiert');
      this.editUser.anotherUsernameFalse();
    }, (errorCode) => this.editUser.anotherUsername());
  }

}
export class UserRating {
  constructor(public id: number, public ratingName: string, public userName: string) { }
}
