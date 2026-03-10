import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-revenue',
  imports: [CommonModule],
  templateUrl: './revenue.html',
  styleUrl: './revenue.css'
})
export class Revenue implements OnInit {
  revenueData: any = null;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.apiService.getRevenue().subscribe(data => {
      this.revenueData = data;
      this.cdr.detectChanges();
    });
  }
}
