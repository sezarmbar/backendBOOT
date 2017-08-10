import { Router, ActivatedRoute, NavigationEnd, Params, ParamMap } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { RatingService } from '../service/rating.service';
import { Rating, Review } from "../";
import { MdDialog, MdDialogRef } from '@angular/material';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Rx';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

    
@Component({ selector: 'app-rating-page', templateUrl: './rating-page.component.html', styleUrls: ['./rating-page.component.scss'],
animations: [
  
          trigger('focusPanel', [
              state('inactive', style({
                  transform: 'scale(1)',
                  // backgroundColor: '#eee'
                  zIndex: 2
                  
              })),
              state('active', style({
                  transform: 'scale(3)',
                  zIndex: 999
                  // backgroundColor: '#cfd8dc'
              })),
              transition('inactive => active', animate('100ms ease-in')),
              transition('active => inactive', animate('100ms ease-out'))
          ]),
  
          trigger('movePanel', [
              
              transition('void => *', [
                  animate(600, keyframes([
                      style({opacity: 0, transform: 'translateY(-200px)', offset: 0}),
                      style({opacity: 1, transform: 'translateY(25px)', offset: .95}),
                      style({opacity: 1, transform: 'translateY(0)', offset: 1}),
                  ]))
              ])
  
          ])
  
  
      ]
})
export class RatingPageComponent implements OnInit {
  statusCode: number;
  rating: Rating;
  ratingObserve: any;
  currentNameRating: string;
  id: String;
  requestProcessing = false;
  // allRating: Rating[];
  isLoaded: boolean = false;
  title: String = null;
  enteredReview: string = null;
  isRatinActiveded: boolean = false;
  review: Review;
  timeout: boolean = true;
  timeoutReview: boolean = false;

  empjiStatus:EmpjiStatus;
  

  state: string = 'inactive';
    timeOut(item){
      let rat = item.target.id;

      this.toggleMove(rat);
      setTimeout(() => {
      this.toggleMove(rat);
      
        },250);
    }
      toggleMove(rat) {
          this.empjiStatus[rat] = (this.empjiStatus[rat] === 'inactive' ? 'active' : 'inactive');
      }

  constructor(public dialog: MdDialog, private ratingService: RatingService,
              private router: Router, private activatedRoute: ActivatedRoute) {


    router.events.subscribe((val: any) => {
      // console.log(val.url)
      this.getURL();
    });
  }


  ngOnInit() {
    this.getURL();
    this.empjiStatus = new EmpjiStatus('inactive','inactive','inactive','inactive','inactive');
    this.ratingObserve = Observable.interval(1000 * 60).subscribe(x => {
      this.getRatingByName(this.currentNameRating)
    });
    //          or
    // this.readIdFromUrl()
  }

  getURL() {
    const name = this
      .activatedRoute
      .snapshot
      .paramMap
      .get('id');
    this.getRatingByName(name);
    this.currentNameRating = name;
  }

  openDialog() {
    if (this.timeoutReview) {
      let dialogRef = this
        .dialog
        .open(DialogReviewEnter);
      dialogRef
        .afterClosed()
        .subscribe(result => {
          this.enteredReview = result;
          if (this.enteredReview != null && this.enteredReview != "") {
            this.addReview(this.enteredReview)
          } else {
            this.timeoutReview = false;
          }
        });
    }
  }

  readIdFromUrl() {
    let name =
      this
        .activatedRoute
        .paramMap
        .switchMap((params: ParamMap) => params.get('id'));
    this.getRatingByName(name);
    console.log(name);
    //  or this.activatedRoute.params.subscribe(   (params: Params) => {this.id =
    // params['id']; this.getRating(this.id); this.isLoaded = true},
    // (err)=>console.log(err))
  }

  updateRating(event) {
    if (this.timeout) {
      let rat = event.target.id;
      let tmpValue = this.rating[rat];
      tmpValue = ((tmpValue) + 1)
      this.rating[rat] = tmpValue
      this.timeout = false;
      this.onAddOrUpdateRate(this.rating);
      if (rat === "bad" || rat === "veryBad")
        this.timeoutReview = true;
      setTimeout(() => this.timeout = true, this.rating.waitingTime * 60000);
    }

  }

  onAddOrUpdateRate(rating: Rating) {
    this.preProcessConfigurations();
    this
      .ratingService
      .putRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
      }, (errorCode) => this.statusCode = errorCode);
  }

  getRating(id) {
    this.preProcessConfigurations();
    this
      .ratingService
      .getRatingById(id)
      .subscribe((rating) => {
        this.requestProcessing = false;
        this.isRatinActiveded = rating.active;
        this.rating = rating;
        this.title = rating.description;
      }, (errorCode) => this.statusCode = errorCode);

  }
  getRatingByName(name) {
    this.preProcessConfigurations();
    this
      .ratingService
      .getRatingByName(name)
      .subscribe((rating) => {
        this.requestProcessing = false;
        this.isRatinActiveded = rating.active;
        this.rating = rating;
        this.title = rating.description;
      }, (errorCode) => this.statusCode = errorCode);

  }

  addReview(enterdReview) {
    let review = new Review(null, enterdReview, this.rating);
    if (this.timeoutReview) {
      this.timeoutReview = false;
      this
        .ratingService
        .putReview(review)
        .subscribe((successCode) => {
          this.statusCode = successCode;
          this.enteredReview = null;
        }, (errorCode) => this.statusCode = errorCode);
    }
  }

  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }

  ngOnDestroy() {
    this.ratingObserve.unsubscribe();
  }

}

@Component({ selector: 'dialog-review-enter', templateUrl: 'dialog-review-enter.html', styleUrls: ['./dialog-review-enter.scss'] })
export class DialogReviewEnter {
  public enteredReview: string;
  constructor(public dialogRef: MdDialogRef<DialogReviewEnter>) { }

}

export class EmpjiStatus{
  constructor( 
  public veryBad: string,
  public bad: string,
  public normal: string,
  public god: string,
  public veryGod: string,){}
}