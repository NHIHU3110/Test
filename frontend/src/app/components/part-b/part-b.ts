import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-part-b',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './part-b.html',
  styleUrl: './part-b.css',
})
export class PartB {
  user$: Observable<any>;
  isLoggedIn$: Observable<boolean>;
  isEmployee$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
    this.isLoggedIn$ = new Observable(sub => this.authService.user$.subscribe(user => sub.next(!!user)));
    this.isEmployee$ = new Observable(sub => this.authService.user$.subscribe(user => sub.next(user && (user.role === 'Employee' || user.role === 'Admin'))));
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
