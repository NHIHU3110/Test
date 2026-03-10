import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userSubject = new BehaviorSubject<any>(null);
    user$ = this.userSubject.asObservable();

    constructor() { }

    login(userData: any) {
        this.userSubject.next(userData);
    }

    logout() {
        this.userSubject.next(null);
    }

    isLoggedIn() {
        return !!this.userSubject.getValue();
    }

    isEmployee() {
        const user = this.userSubject.getValue();
        return user && (user.role === 'Employee' || user.role === 'Admin');
    }

    getCurrentUser() {
        return this.userSubject.getValue();
    }
}
