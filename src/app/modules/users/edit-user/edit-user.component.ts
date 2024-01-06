import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../models/users.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: UserModel = {};

  constructor(private api: UserApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const { id } = params
      // console.log(id)
      this.getUser(id)
    })

  }

  getUser = (id: any) => {
    this.api.getOneUser(id).subscribe({
      next: (res) => {
        console.log(res)
        this.user = res
      },
      error: (err) => {
        alert("Something Went wrong!")
        console.log(err)
      }
    })
  }

  handleUpdateUser = (id: any) => {
    this.api.updateUser(id, this.user).subscribe({
      next: (res) => {
        console.log(res)
        alert("User updated successfully")
        this.router.navigateByUrl("/users")
      },
      error: (err) => {
        console.log(err)
        alert("Something Went Wrong")
      }
    })
  }
 
}
