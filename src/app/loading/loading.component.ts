import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private loadingService: LoadingService) {}
  ngOnInit(): void {
    this.loadingService.isLoadingSubject.subscribe((value) => {
      this.isLoading = value;
    });
  }
}
