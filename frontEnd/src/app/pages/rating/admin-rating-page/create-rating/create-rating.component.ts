import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Rating,RatingService } from '../../';

@Component({
  selector: 'app-create-rating',
  templateUrl: './create-rating.component.html',
  styleUrls: ['./create-rating.component.scss']
})
export class CreateRatingComponent implements OnInit {

  nameError: boolean;
  rating: Rating;
  form: FormGroup;
  submitted = false;
  requestProcessing = false;

  statusCode: number;
  constructor(private ratingService: RatingService, private formBuilder: FormBuilder, ) { }
  ngOnInit() {

    this.form = this.formBuilder.group({
      ratingName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
      waitingTime: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3)])],
      description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64)])],
      active: []
    });

  }
  onSubmit() {
    this.submitted = true;
    const creatRD = this.form.value;
    this.rating = new Rating(null, creatRD.ratingName, creatRD.description, 0, 0, 0, 0, 0, null, creatRD.active, creatRD.waitingTime);
    this.createRating(this.rating);
  }

  createRating(rating: Rating) {
    this
      .ratingService
      .createRating(rating)
      .subscribe((successCode) => {
        this.statusCode = successCode;
        this.requestProcessing = false;
        this.nameError = false;
      }, (errorCode) => {
        if (errorCode === 406) {
          this.nameError = true;
        }
      });

  }
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }
  onCansle() {
    // this.onCancle.emit();
    // console.log(this.form.value);
  }

}
