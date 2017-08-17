import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Rating } from '../../';
import { RatingService } from '../../../../service';
import { ToastrService } from 'ngx-toastr';
import { UserService, ApiService2, ConfigService } from '../../../../service';
import { UserRating } from '../../../../model';
import { CreateUserPage } from './../../../../guard/loginAdminUser.guard';

@Component({ selector: 'app-create-rating', templateUrl: './create-rating.component.html', styleUrls: ['./create-rating.component.scss'] })
export class CreateRatingComponent implements OnInit {

  nameError: boolean;
  rating: Rating;
  form: FormGroup;
  submitted = false;
  requestProcessing = false;
  statusCode: number;

  ratingName: FormControl;
  waitingTime: FormControl;
  description: FormControl;
  active: FormControl;

  constructor(private toastr: ToastrService, private ratingService: RatingService,
    private apiService: ApiService2,
    private createUserPage: CreateUserPage,
    private config:ConfigService, private formBuilder: FormBuilder) {
    this.createForm();
  }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.ratingName = new FormControl('', [Validators.required, Validators.minLength(3)]);
    this.waitingTime = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.active = new FormControl('');

    this.form = this
      .formBuilder
      .group({ ratingName: this.ratingName, waitingTime: this.waitingTime, description: this.description, active: this.active });

  }
  showForm: boolean = true;
  onSubmit() {
    this.submitted = true;
    const creatRD = this.form.value;
    this.rating = new Rating(null, creatRD.ratingName, creatRD.description, 0, 0, 0, 0, 0, null, creatRD.active, creatRD.waitingTime);
    this.createRating(this.rating);
    

    this.showForm = false;
    setTimeout(() => {
      this.createForm();
      this.showForm = true;
    });
  }

  createRating(rating: Rating) {
    this
      .ratingService
      .createRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
        this.requestProcessing = false;
        this.nameError = false;
        if (!this.createUserPage.active) {
          const userRating = new UserRating(null,rating.nameOfRat,this.createUserPage.username);
          this.putUserRating(userRating);
        } 
        this.showSuccess();
      }, (errorCode) => {
        if (errorCode === 406) {
          this.nameError = true;
        }
      });

  }

  putUserRating(userRating: UserRating) {
    this.apiService.putUserRating(this.config.user_rating_url, userRating)
      .subscribe((successCode) => this.statusCode =successCode , (error) => console.log(error));
  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  onCansle() {
    // this.onCancle.emit(); console.log(this.form.value);
  }

}
