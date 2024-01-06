import { Component } from '@angular/core';
import { UserModel } from '../models/users.models';
import { UserApiService } from '../user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  user: UserModel = {}; //To hold user data from the user

  constructor(private api: UserApiService, private router:Router) { }

  handleAddUSer = () => {
    // console.log(this.user)
    this.api.addUserApi(this.user).subscribe({
      next: (res: UserModel) => {
        console.log(res)
        alert("New User Added Successfully")
        this.router.navigateByUrl('users')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
