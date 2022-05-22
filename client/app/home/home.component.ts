import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'home-app',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  user : any
  constructor(private auth: AuthService){
    this.user = this.auth.currentUser
  }

  ngOnInit(): void {

  }

}
