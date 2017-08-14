import { User } from './../model/user';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit , OnDestroy {
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() userIncome: Subject<any>;
  submitted = false;
  form: FormGroup;
  authorities: Authority[] = [];
  FormDataValue;
  active2 = false;
  user: User;
  firstname: FormControl;
  lastname: FormControl;
  username: FormControl;
  password: FormControl;
  email: FormControl;
  active: FormControl;
  admin: FormControl;


  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) { }
// TODO
  ngOnInit() {
    this.userIncome.subscribe(event => {
      console.log(event);
      this.user = event;
    });
    this.createForm();
  }
// https://stackoverflow.com/questions/37677122/child-listens-for-parent-event-in-angular-2
  createForm() {
    this.firstname = new FormControl(this.user.firstname);
    this.lastname = new FormControl(this.user.lastname);
    this.username = new FormControl(this.user.username);
    this.password = new FormControl('');
    this.email = new FormControl(this.user.email);
    this.active = new FormControl('');
    this.admin = new FormControl('');
    this.form = this.formBuilder.group({
      firstname: this.firstname,
      lastname: this.lastname,
      username: this.username,
      password: this.password,
      email: this.email,
      active: this.active,
      admin: this.admin
    });
  }
ngOnDestroy() {
  this.userIncome.unsubscribe();
}
}
export class Authority {
  constructor(private name: string) { }

}
