import { FormControl } from '@angular/forms';
import { Rating } from './../../rating/model/rating';
import { User } from './../model/user';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
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
  @Input() user: User;
  @Input() allRatings;
  @Input() selfRatings;
  stateCtrl: FormControl;
  filteredStates: any;
  admin = false;
  numRatings = 0;

  constructor(private toastr: ToastrService) {
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(name => this.filterStates(name));
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  isAdmin() {
    this.admin = this.getRoles();
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
    }
  }
  addUserRating(userRating) {
    const userRatings: Array<UserRating> = this.selfRatings as Array<UserRating>;
    // tslint:disable-next-line:arrow-return-shorthand
    const UR = userRatings.find(ur => { return ur.ratingName === userRating.ratingName });
    if (UR === undefined) {
      this.userRating.emit(userRating);
    }
  }
  dleteUserRating(userRating: UserRating) {
    this.delteUserRating.emit(userRating);
  }
  updateUser(user){
    this.onDatePicked.emit(user);
  }
}

export class UserRating {
  constructor(public id: number, public ratingName: string, public userName: string) { }
}
export class Authority {
  constructor(id: number, public name: string) { }

}
