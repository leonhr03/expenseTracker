import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import supabase from '../supabase';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  constructor(private router: Router) {}
  loginCard = true;
  email = '';
  password = '';

  ngOnInit(){
    this.checkIsLogIn()
  }

  async checkIsLogIn(){
    const isLogin = await localStorage.getItem("IsLogin")
    if(isLogin === "true"){
      this.router.navigate(['/dashboard'])
    }
    else {
      this.loginCard = true;
    }
  }

  async login() {
    const {error} = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    })

    if (error) {
      alert(error.message)
    }

    await localStorage.setItem("IsLogin", "true")

    this.router.navigate(['/dashboard'])
  }

  async register() {
    const {error} = await supabase.auth.signUp({
      email: this.email,
      password: this.password,
    })

    if (error) {
      alert(error.message)
    }

    await localStorage.setItem("IsLogin", "true")

    this.router.navigate(['/dashboard'])
  }
}
