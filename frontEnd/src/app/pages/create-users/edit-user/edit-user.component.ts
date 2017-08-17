import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Rating } from './../../rating/model/rating';
import { User } from './../model/user';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';

import { UserRating,Authority } from '../../../model';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnDestroy {
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() userRating: EventEmitter<any> = new EventEmitter<any>();
  @Output() delteUserRating: EventEmitter<any> = new EventEmitter<any>();
  @Output() delteUser: EventEmitter<any> = new EventEmitter<any>();
  @Input() user: User;
  @Input() allRatings;
  @Input() selfRatings;
  userToUpdate: User;
  authorities: Authority[] = [{ name: 'ROLE_USER' }];
  FormDataValue;
  stateCtrl: FormControl;
  filteredStates: any;
  admin = false;
  state;
  _anotherUsername: boolean = false;
  numRatings = 0;
  form: FormGroup;
  firstname: FormControl;
  lastname: FormControl;
  username: FormControl;
  password: FormControl;
  email: FormControl;
  active: FormControl;
  isadmin: FormControl;
  selectedValue;
  administrator = 'admin';
  _notAdmin = false;
  // isAdministrator = false;

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
  }
  createForm() {
    this.firstname = new FormControl(this.user.firstname, Validators.compose([Validators.required,
    Validators.minLength(4), Validators.maxLength(16)]));
    this.lastname = new FormControl(this.user.lastname,
      Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(16)]));
    this.username = new FormControl(this.user.username,
      Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(64)]));
    this.password = new FormControl(null);
    this.email = new FormControl(this.user.email, Validators.email);
    this.active = new FormControl(this.user.enabled);
    this.isadmin = new FormControl(this.getRoles());

    this.form = this.formBuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      email: this.email,
      active: this.active,
      isadmin: this.isadmin
    });
  }

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }


  isAdmin() {
    this.admin = this.getRoles();
    this._anotherUsername = false;
    this.preUpdateUser();
    if (this.user.username === this.administrator) {
      this._notAdmin = false;
      this.form.get('firstname').disable();
      this.form.get('lastname').disable();
      this.form.get('username').disable();
      this.form.get('active').disable();
      this.form.get('isadmin').disable();
    } else {
      this._notAdmin = true;
      this.form.get('firstname').enable();
      this.form.get('lastname').enable();
      this.form.get('username').disable();
      this.form.get('active').enable();
      this.form.get('isadmin').enable();
    }
  }
  anotherUsername() {
    this._anotherUsername = true;
  }
  anotherUsernameFalse() {
    this._anotherUsername = false;
  }
  getRoles(): boolean {
    let isAdmin = false;
    const roles: Array<Authority> = this.user.authorities as Array<Authority>;
    const role = roles.find(role => { return role.name === 'ROLE_ADMIN'; });
    if (role !== undefined) {
      isAdmin = true;
    }
    return isAdmin;
  }
  filterStates(val: string) {
    return val ? this.allRatings.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
      : this.allRatings;
  }
  preAddUserRating(value) {
    let userRating;
    if (value !== '') {
      userRating = new UserRating(null, value, this.user.username);
      this.addUserRating(userRating);
      this.selectedValue = '';
    }
  }
  addUserRating(userRating) {
    const userRatings: Array<UserRating> = this.selfRatings as Array<UserRating>;
    // tslint:disable-next-line:arrow-return-shorthand
    const UR = userRatings.find(ur => { return ur.ratingName === userRating.ratingName; });
    if (UR === undefined) {
      this.userRating.emit(userRating);
    }
  }
  dleteUserRating(userRating: UserRating) {
    this.delteUserRating.emit(userRating);
  }
  preUpdateUser() {
    this.form.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      username: this.user.username,
      // password : this.user.password ,
      email: this.user.email,
      active: this.user.enabled,
      isadmin: this.getRoles()
    });
  }

  onSubmit() {
    this.FormDataValue = this.form.value;
    if (this.FormDataValue.isadmin) {
      const ROLE_ADMIN = new Authority(null, 'ROLE_ADMIN');
      this.authorities.push(ROLE_ADMIN);
    }

    this.userToUpdate = new User(this.user.id, this.FormDataValue.email, this.user.username, this.FormDataValue.password,
      this.FormDataValue.firstname, this.FormDataValue.lastname, this.authorities, this.FormDataValue.active);
    this.updateUser();
  }
  updateUser() {
    this.onDatePicked.emit(this.userToUpdate);
  }

  succesMessage(message) {
    this.toastr.success(message);
  }
  dleteUser() {
    this.delteUser.emit(this.user);
  }
}
