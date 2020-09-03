import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import {RegisterUser} from '../register/registerUser'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService) { }

  registerUser:any = {}

  ngOnInit(): void {
  }

  register(registerUser:RegisterUser) {
    this.authService.register(registerUser)
  }

}
