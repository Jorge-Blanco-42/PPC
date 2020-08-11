import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Global } from 'src/app/services/global';
import { User } from '../../models/user';
import { getMultipleValuesInSingleSelectionError } from '@angular/cdk/collections';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers: [UserService]
})
export class RolesComponent implements OnInit {
  public users: Array<User>;
  public user: User;
  public add: boolean; 
  public sent: boolean;
  constructor(
    private _userService: UserService
  ) { 
    this.user = new User("","","","","","",[]);
    this.add=false;
    this.sent=false;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._userService.getUsers().subscribe(
      response => {
        if (response.users) {
          this.users = response.users;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  updateUser(newUser, role){
    newUser.role = role.srcElement.value;
    console.log(role.srcElement.value);
    this._userService.updateUser(newUser).subscribe(
      response => {
        console.log(response);
      },
      error => {
        
        console.log(error);
      }

    );
  }
  deleteUser(user){

  }
}
