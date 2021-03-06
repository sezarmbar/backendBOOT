import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
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

  ratingName:FormControl;
  waitingTime:FormControl;
  description:FormControl;
  active:FormControl;

  constructor(private ratingService: RatingService, private formBuilder: FormBuilder, ) { 
     this.createForm();
  }
  ngOnInit() {
    // this.form = this.formBuilder.group({
    //   ratingName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(16)])],
    //   waitingTime: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(3)])],
    //   description: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(64)])],
    //   active: ['']
    // });
this.createForm();
  }
  createForm(){
    this.ratingName = new FormControl('',[Validators.required, Validators.minLength(3)]);
    this.waitingTime = new FormControl('',Validators.required);
    this.description = new FormControl('',Validators.required);
    this.active = new FormControl('');

    this.form = this.formBuilder.group({
      ratingName: this.ratingName,
      waitingTime: this.waitingTime,
      description: this.description,
      active: this.active
    });

  }
  showForm:boolean = true;
  onSubmit() {
    this.submitted = true;
    const creatRD = this.form.value;
    this.rating = new Rating(null, creatRD.ratingName, creatRD.description, 0, 0, 0, 0, 0, null, creatRD.active, creatRD.waitingTime);
    this.createRating(this.rating);
    
    this.showForm = false;
    setTimeout(() => {
    this.createForm()
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
