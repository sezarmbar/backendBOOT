import { CreateUserPage } from './../../../guard/loginAdminUser.guard';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Rating, Review } from '../';
import { RatingService} from '../../../service'
import { RatingInfoComponent } from './rating-info/rating-info.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-admin-rating-page', templateUrl: './admin-rating-page.component.html', styleUrls: ['./admin-rating-page.component.scss']
})
export class AdminRatingPageComponent implements OnInit {

  showRatingInfo = false;
  statusCode: number;
  rating: Rating = new Rating(null, null, null, null, null, null, null, null, null, null, null);
  id: String = '1';
  requestProcessing = false;
  allRating: Rating[];
  nameRating = 'new One';
  description = 'description for theis';
  waitingTime = 50;
  allReviwsForRating: Review[];
  chartDate: any;
  oldRatingId;

  nameError = false;
  @ViewChild('setReviewData') ReviewData: RatingInfoComponent;
  observ = false;
  observSubscribe: any;
  constructor(private ratingService: RatingService, private route: Router, private activatedRoute: ActivatedRoute,
    private createUserPage: CreateUserPage) { }

  ngOnInit() {
    this.getAllRating();
  }

  readIdFromUrl() {
    this
      .activatedRoute
      .params
      .subscribe((params: Params) => {
        this.id = params['id'];
        this.getRating(this.id);
      }, (err) => console.log(err));

  }

  updateRating(rating: Rating): void {
    this.Updaterating(rating);
  }
  Updaterating(rating: Rating) {
    this.preProcessConfigurations();
    this
      .ratingService
      .updateInfoRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
        this.requestProcessing = false;
      }, (errorCode) => this.statusCode = errorCode);

  }

  getAllRating() {
    if (this.createUserPage.active) {
      this.getAllRatings();
    } else {
      this.getAllRatingsByUsername();
    }
  }

  getAllRatings() {
    this.preProcessConfigurations();
    this
      .ratingService
      .getAllRatings()
      .subscribe((data) => {
        this.allRating = data;
        this.requestProcessing = false;
      }, (errorCode) => this.statusCode = errorCode);
  }
  getAllRatingsByUsername() {
    this.preProcessConfigurations();
    this
      .ratingService
      .getAllRatingsByUsername(this.createUserPage.username)
      .subscribe((data) => {
        this.allRating = data;
        this.requestProcessing = false;
      }, (errorCode) => this.statusCode = errorCode);
  }

  getRating(id) {
    this.preProcessConfigurations();
    this
      .ratingService
      .getRatingById(id)
      .subscribe((rating) => {
        this.requestProcessing = false;
        this.rating = rating;
        this.constructorChartData();
        if (!this.observ || !(this.oldRatingId === id)) {
          this.getAllReviews();
        }
        this.oldRatingId = id;
      }, (errorCode) => this.statusCode = errorCode);

  }

  getRatingLocal(rating: Rating) {
    this.infoRating();
    this.rating = rating;
    this.constructorChartData();
    // if(!this.observ || this.oldRatingId != rating.id)
    { this.getAllReviews(); }
    this.oldRatingId = rating.id;
  }

  deletRating(rating) {
    this.preProcessConfigurations();
    this
      .ratingService
      .deleteRatingByRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
        this.requestProcessing = false;
        this.getAllRating();
        this.closeInfpRating();
      }, (errorCode) => this.statusCode = errorCode);
  }


  getAllReviewsObservable(value) {
    if (value.checked === true) {
      this.ovservSubscribe();
      this.observ = true;
    } else {
      this.ovservUnSubscribe();
      this.observ = false;
    }

  }
  ovservSubscribe() {
    let waitingTime = this.rating.waitingTime;
    if (this.rating.waitingTime === 0) {
      waitingTime = 0.1;
    }
    this.observSubscribe = Observable.interval(waitingTime * 60000).subscribe(x => {
      this.getAllReviews();
      this.getRating(this.oldRatingId);
    });
  }
  ovservUnSubscribe() {
    if (this.observSubscribe !== undefined) {
      this.observSubscribe.unsubscribe();
    }
  }


  getAllReviews() {
    this
      .ratingService
      .getAllReviews(this.rating)
      .subscribe(reviews => {
        this.allReviwsForRating = reviews;
        this.infoRating();
        this.setReviewData(reviews);
      }, (errorCode) => this.statusCode = errorCode);
  }
  setReviewData(reviews) {
    if (this.ReviewData !== undefined) {
      this.ReviewData.setReviewData(reviews);
    }
  }
  constructorChartData() {
    this.chartDate = [
      {
        'name': 'schlicht',
        'value': this.rating.veryBad
      }, {
        'name': 'unzufrieden',
        'value': this.rating.bad
      }, {
        'name': 'normal',
        'value': this.rating.normal
      }, {
        'name': 'zufrieden',
        'value': this.rating.god
      }, {
        'name': 'glücklich',
        'value': this.rating.veryGod
      }
    ];

  }


  infoRating() {
    this.showRatingInfo = true;
  }
  closeInfpRating() {
    this.showRatingInfo = false;
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

}
