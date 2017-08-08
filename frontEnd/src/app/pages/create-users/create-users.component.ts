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
  }


  createUser(user: User) {

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
