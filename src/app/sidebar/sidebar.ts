import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import supabase from '../supabase';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private cdr: ChangeDetectorRef) {}
  @ViewChild("user") user!: ElementRef<HTMLParagraphElement>;

  async ngOnInit() {
    const {data: userData} = await supabase.auth.getUser();
    this.user.nativeElement.innerText = <string>userData.user?.email;
    this.cdr.detectChanges();
  }


  async logout() {
    await supabase.auth.signOut();
    await localStorage.removeItem("IsLogin");
    window.location.href = "/ExpenseTracker/";
  }
}
