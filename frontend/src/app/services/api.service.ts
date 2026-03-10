import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/products`);
    }

    searchProducts(price: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/products?price=${price}`);
    }

    login(credentials: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, credentials);
    }

    getRevenue(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/stats/revenue`);
    }

    getVipCustomers(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/stats/vip`);
    }

    createOrder(orderData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/orders`, orderData);
    }
}
