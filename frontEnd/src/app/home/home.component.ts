import { Component, OnInit } from '@angular/core';
import { Rating } from "../pages/rating";
import { CreateUserPage } from './../guard/loginAdminUser.guard';

import { RatingService,UserService } from '../service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  allRating: Rating[] ;
  statusCode;
  constructor(private ratingService: RatingService,
    private userService:UserService,
    private createUserPage: CreateUserPage) { }

  ngOnInit() {
    this.getAllRating();
    console.log(this.createUserPage.username);
  }

  getAllRating() {
    if (this.createUserPage.active) {
      this.getAllRatings();
    } else {
      this.userService.getMyInfo().subscribe((res) => {this.getAllRatingsByUsername(res.username);});
      
      
    }
  }
  getAllRatings() {
    this
      .ratingService
      .getAllRatings()
      .subscribe((data) => {
        this.allRating = data;
      }, (errorCode) => this.statusCode = errorCode);
  }

  getAllRatingsByUsername(username) {
    this
      .ratingService
      .getAllRatingsByUsername(username)
      .subscribe((data) => {
        this.allRating = data;
      }, (errorCode) => this.statusCode = errorCode);
  }
}
