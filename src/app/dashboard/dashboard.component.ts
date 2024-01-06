import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { AdminApiService } from '../services/admin-api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  selected: Date | null = new Date()
  showSideBar: boolean = true;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions = {}
  users: any = []
  adminName: any = ''
  adminPassword: any = ''
  adminEmail: any = ''

  constructor(private api: AdminApiService) {
    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Employee Statitics'
      },
      tooltip: {
        valueSuffix: '%'
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: [{
            enabled: true,
            distance: 20
          }, {
            enabled: true,
            distance: -40,
            format: '{point.percentage:.1f}%',
            style: {
              fontSize: '1.2em',
              textOutline: 'none',
              opacity: 0.7
            },
            filter: {
              operator: '>',
              property: 'percentage',
              value: 10
            }
          }]
        }
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Percentage',
          colorByPoint: true,
          data: [
            {
              name: 'Perfomance',
              y: 55.02
            },
            {
              name: 'Dedicationt',
              sliced: true,
              selected: true,
              y: 26.71
            },
            {
              name: 'Working',
              y: 15.09
            }
          ]
        }
      ]
    }
    HC_exporting(Highcharts);
  }
  ngOnInit(): void {
    this.getAllUsers()
    this.adminName = localStorage.getItem("adminName")
    this.adminPassword = localStorage.getItem("adminPassword")
    this.adminEmail = localStorage.getItem("adminEmail")
  }

  getAllUsers = () => {
    this.api.getUsers().subscribe({
      next: (res) => {
        // console.log(res)
        this.users = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  showHide = () => {
    this.showSideBar = !this.showSideBar
  }

  updateAdminHandle = () => {
    console.log(this.adminEmail)
    this.api.updateAdmin({ name: this.adminName, password: this.adminPassword, email: "admin@gmail.com", active: "1" }).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
