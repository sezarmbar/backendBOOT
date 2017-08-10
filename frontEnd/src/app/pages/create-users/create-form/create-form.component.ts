import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss']
})
export class CreateFormComponent implements OnInit {
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  submitted = false;
  form: FormGroup;
  user: User;
  authorities: Authority[] = [];
  FormDataValue;
  active:boolean =false;
  
  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.form = this.buildForm();
  }

  buildForm(){
     return this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(16)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(64)])],
      email: ['', Validators.email],
      active: [],
      admin: []
    });
  }


  onSubmit() {
    
    this.submitted = true;
    
    const ROLE_USER = new Authority('ROLE_USER');
    this.authorities.push(ROLE_USER);

    this.FormDataValue = this.form.value;
    if (this.FormDataValue.admin) {
      const ROLE_ADMIN = new Authority('ROLE_ADMIN');
      this.authorities.push(ROLE_ADMIN);
    }
    if(this.FormDataValue.active){
      this.active = true;
    }
    this.user = new User(null,this.FormDataValue.email,this.FormDataValue.username,this.FormDataValue.password,
                        this.FormDataValue.firstname,this.FormDataValue.lastname,this.authorities,this.active);

    this.onDatePicked.emit(this.user);

    this.cleanData();
  }

  cleanData(){
    this.FormDataValue =null;
    this.authorities =[];
    this.user=null;
    this.active=false;
  }

}
export class Authority {
  constructor(private name: string) { }
}

