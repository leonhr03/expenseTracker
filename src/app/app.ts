import {ChangeDetectorRef, Component, ViewChild, ElementRef} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Sidebar} from './sidebar/sidebar';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import supabase from './supabase';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, NgIf, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  @ViewChild('output') output!: ElementRef<HTMLDivElement>;
  isLogInd = false;
  loginCard = true;
  email = '';
  password = '';

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(){
    const isLogin = localStorage.getItem("IsLogin");
    this.isLogInd = !!isLogin;
    if(this.isLogInd){
      this.router.navigate(['/dashboard']);
    }
  }

  async login() {
    if(this.email === "" || this.password === ""){
      this.setOutput("Bitte fülle alle Felder aus");
      return;
    }

    const {error} = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      alert(error.message);
      this.setOutput("Fehler beim Login, bitte versuche es erneut");
      return;
    }

    localStorage.setItem("IsLogin", "true");
    this.isLogInd = true;
    this.setOutput("Login erfolgreich");
    this.router.navigate(['/dashboard']);
    this.cdr.detectChanges();
  }

  async register() {
    if(this.email === "" || this.password === ""){
      this.setOutput("Bitte fülle alle Felder aus");
      return;
    }

    const {error} = await supabase.auth.signUp({
      email: this.email,
      password: this.password,
    });

    if (error) {
      alert(error.message);
      this.setOutput("Fehler beim Login, bitte versuche es erneut");
      return;
    }

    localStorage.setItem("IsLogin", "true");
    this.isLogInd = true;
    this.setOutput("Sign In erfolgreich");
    this.router.navigate(['/dashboard']);
    this.cdr.detectChanges();
  }

  private setOutput(message: string) {
    if(this.output) {
      this.output.nativeElement.innerText = message;
    }
    this.cdr.detectChanges();
  }
}
