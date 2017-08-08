import { Router, ActivatedRoute, Params } from '@angular/router';
import { OnInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Rating, Review, RatingService } from '../';
import { RatingInfoComponent } from './rating-info/rating-info.component';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-admin-rating-page', templateUrl: './admin-rating-page.component.html', styleUrls: ['./admin-rating-page.component.scss']
})
export class AdminRatingPageComponent implements OnInit {

  showCreateForm: boolean = false;
  showRatingInfo: boolean = false;
  statusCode: number;
  rating: Rating = new Rating(null, null, null, null, null, null, null, null, null, null, null);
  id: String = '1';
  requestProcessing = false;
  allRating: Rating[];
  nameRating: string = 'new One';
  description: string = 'description for theis';
  waitingTime: number = 50;
  allReviwsForRating: Review[];
  chartDate: any;
  oldRatingId;

  nameError: boolean = false;
  @ViewChild('setReviewData') ReviewData: RatingInfoComponent;
  observ: boolean = false;
  observSubscribe: any;
  constructor(private ratingService: RatingService, private route: Router, private activatedRoute: ActivatedRoute) { }

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

  createNewRating() {
    const ratein = new Rating(null, this.nameRating, this.description, 0, 0, 0, 0, 0, null, true, this.waitingTime);
    this.createRating(ratein);
  }

  updateRating(rating: Rating): void {
    this.Updaterating(rating);
  }
  Updaterating(rating: Rating) {
    this.preProcessConfigurations();
    this
      .ratingService
      .putRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
        this.requestProcessing = false;
      }, (errorCode) => this.statusCode = errorCode);

  }
  createRating(rating: Rating) {
    this.preProcessConfigurations();
    this
      .ratingService
      .createRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
        this.requestProcessing = false;
        this.getAllRating();
        this.formClose();
        this.nameError = false;
      }, (errorCode) => {
        if (errorCode === 406) {
          this.nameError = true;
        }
      });

  }

  getAllRating() {
    this.preProcessConfigurations();
    this
      .ratingService
      .getAllRatings()
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
    this.observSubscribe = Observable.interval(this.rating.waitingTime * 60000).subscribe(x => {
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
  formClose() {
    this.showCreateForm = false;
  }
  formOpen() {
    this.showCreateForm = true;
    this.showRatingInfo = false;
    this.ovservUnSubscribe();
  }
  infoRating() {
    this.formClose();
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
