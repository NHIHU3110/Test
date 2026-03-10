import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vip',
  imports: [CommonModule],
  templateUrl: './vip.html',
  styleUrl: './vip.css'
})
export class Vip implements OnInit {
  vips: any[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.apiService.getVipCustomers().subscribe(data => {
      this.vips = data;
      this.cdr.detectChanges();
    });
  }
}
