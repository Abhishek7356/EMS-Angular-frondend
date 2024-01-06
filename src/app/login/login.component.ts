import { Component } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private api: AdminApiService, private router: Router) { }

  handleLogin = () => {
    if (this.email == '' || this.password == '') {
      alert("Please fill the form")
    } else {
      this.api.Authenticate().subscribe({
        next: (res: any) => {
          const { email, password, name } = res //data from the server
          if (email == this.email && password == this.password) {
            localStorage.setItem("adminName", name)
            localStorage.setItem("adminPassword", password)
            localStorage.setItem("adminEmail", this.email)
            alert("Login success")
            this.router.navigateByUrl('/dashboard')
          } else {
            alert("Invalid data!")
          }
          console.log(res)
        },
        error: (res: any) => {
          console.log(res)//error from server
        }
      })
    }
  }
}
