import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Sidebar} from './sidebar/sidebar';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  isLogIn = false;

  ngOnInit(){
    const isLogin = localStorage.getItem("IsLogin")
    if(!isLogin){
      this.isLogIn = false
    }
    else{
      this.isLogIn = true
    }
  }
}
