import { User } from './';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UserService, ApiService2, ConfigService } from '../../service';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {

  showCreateForm: boolean = true;
  allUsers: User[];
  constructor(private userServie: UserService,
    private apiService: ApiService2,
    private config: ConfigService) {
  }

  ngOnInit() {
    this.getAllUsers();
    // this.apiService.getPotected().subscribe(res=>console.log(res),err=>console.log(err))
  }


  createUser(user: User) {

    // const user2 = {
    //   "username": "mbar", "firstname": "sezar", "lastname": "sezar", "email": "sezar@sezar.com",
    //   "password": "sezar", "authorities": [{ "name": "ROLE_USER" }, { "name": "ROLE_ADMIN" }], "enabled": true
    // }
    console.log(user)

    let user1 = JSON.stringify(user)
    return this.apiService.createUser(user1).subscribe((success) => {
      this.getAllUsers();
    }, (errorCode) => console.log(errorCode))
  }
  getAllUsers() {
    this.apiService.getAllUsers(this.config.users_url).subscribe((data) => {
      this.allUsers = data;
    }, (error) => console.log(error));
  }



}
