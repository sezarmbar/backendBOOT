import { Router, ActivatedRoute, NavigationEnd, Params, ParamMap } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { RatingService } from '../../../service';
import { Rating, Review } from '../';
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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rating-page', templateUrl: './rating-page.component.html', styleUrls: ['./rating-page.component.scss'],
  animations: [

    trigger('focusPanel', [
      state('inactive', style({
        transform: 'rotateY(179.9deg)',
        // backgroundColor: '#eee'
        zIndex: 2

      })),
      state('active', style({
        transform: 'scale(1.5)',
        zIndex: 999,
        // backgroundColor: '#cfd8dc'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ]),

    trigger('movePanel', [

      transition('void => *', [
        animate(600, keyframes([
          style({ opacity: 0, transform: 'translateY(-200px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: .95 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
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
  isLoaded = true;
  title: String = null;
  enteredReview: string = null;
  isRatinActiveded = false;
  review: Review;
  timeout = true;
  timeoutReview = false;
  isDialogOpen = false;
  empjiStatus: EmpjiStatus;
  rat;

  state = 'inactive';

  toggleMove(rat) {
    this.empjiStatus[rat] = (this.empjiStatus[rat] === 'inactive' ? 'active' : 'inactive');
  }

  constructor(public dialog: MdDialog, private ratingService: RatingService,
    private toastr: ToastrService,
    private router: Router, private activatedRoute: ActivatedRoute) {


    router.events.subscribe((val: any) => {
      // console.log(val.url)
      this.getURL();
    });
  }


  ngOnInit() {
    this.getURL();
    this.empjiStatus = new EmpjiStatus('inactive', 'inactive', 'inactive', 'inactive', 'inactive');
    // this.ratingObserve = Observable.interval(1000 * 60).subscribe(x => {
    //   this.getRatingByName(this.currentNameRating);
    // });
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
      // this.toggleMove(this.rat);
      const dialogRef = this
        .dialog
        .open(DialogReviewEnter);
      dialogRef
        .afterClosed()
        .subscribe(result => {
          // this.toggleMove(this.rat);
          this.enteredReview = result;
          if (this.enteredReview != null && this.enteredReview !== '') {
            this.addReview(this.enteredReview);
          } else {
            this.timeoutReview = false;
          }
        });
    }
  }

  readIdFromUrl() {
    const name =
      this
        .activatedRoute
        .paramMap
        .switchMap((params: ParamMap) => params.get('id'));
    this.getRatingByName(name);
    //  or this.activatedRoute.params.subscribe(   (params: Params) => {this.id =
    // params['id']; this.getRating(this.id); this.isLoaded = true},
    // (err)=>console.log(err))
  }

  updateRating(event) {
    if (this.timeout) {
      const rat = event.target.id;
      if (rat === 'bad' || rat === 'veryBad') {
        this.timeoutReview = true;
      }
      this.timeOut(rat);
      let tmpValue = this.rating[rat];
      tmpValue = ((tmpValue) + 1);
      this.rating[rat] = tmpValue;
      this.timeout = false;
      this.onAddOrUpdateRate(this.rating);
      // this.openDialog()
      setTimeout(() => this.timeout = true, this.rating.waitingTime * 60000);
    } else {
      this.toastr.warning('!!!', 'warten bitte ');
    }

  }
  timeOut(rat) {
    this.rat = rat;
    this.openDialog();
    // if (!this.timeoutReview) {
      this.toggleMove(rat);
      setTimeout(() => {
        this.toggleMove(rat);
      }, 800);
    // }
  }

  onAddOrUpdateRate(rating: Rating) {
    this.preProcessConfigurations();
    this
      .ratingService
      .updateRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
      }, (errorCode) => this.statusCode = errorCode);
      this.getRatingByName(this.currentNameRating);
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
    const review = new Review(null, enterdReview, this.rating);
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
    // this.ratingObserve.unsubscribe();
  }

}

@Component({ selector: 'dialog-review-enter', templateUrl: 'dialog-review-enter.html', styleUrls: ['./dialog-review-enter.scss'] })
export class DialogReviewEnter {
  public enteredReview: string;
  constructor(public dialogRef: MdDialogRef<DialogReviewEnter>) { }

}

export class EmpjiStatus {
  constructor(
    public veryBad: string,
    public bad: string,
    public normal: string,
    public god: string,
    public veryGod: string, ) { }
}