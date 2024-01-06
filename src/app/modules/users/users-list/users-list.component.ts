import { Component, OnInit } from '@angular/core';
import { UserApiService } from '../user-api.service';
import { UserModel } from '../models/users.models';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any = [];
  adminLoginTime: any = new Date(); //to hold current login date and time
  searchKey: string = '' //to hold search key value
  p: number = 1; //page number start from

  constructor(private api: UserApiService) { }

  ngOnInit(): void {
    this.getAllUSer()
  }

  getAllUSer = () => {
    this.api.getAllApi().subscribe({
      next: (res: UserModel) => {
        console.log(res)
        this.users = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  handleDelete = (id: any) => {
    this.api.deleteApi(id).subscribe({
      next: (res: any) => {
        console.log(res)
        alert("User deleted successfully")
        this.getAllUSer()
      },
      error: (err) => {
        alert("Something Went Wrong !")
        console.log(err)
      }
    })
  }

  sortUserById = () => {
    this.users.sort((a: any, b: any) => a.id - b.id)
  }
  sortUserByName = () => {
    this.users.sort((a: any, b: any) => a.name.localeCompare(b.name))
  }

  generatePdf = () => {
    let pdf = new jsPDF()
    let head: any = [['id', 'name', 'email', 'password']];
    let body: any = []

    this.users.forEach((item: any) => {
      body.push([item.id, item.name, item.email, item.password])
    })

    pdf.text('All Users List', 10, 10)
    autoTable(pdf, { head, body })
    pdf.output("dataurlnewwindow")
    pdf.save("All Users list pdf")
  }

}