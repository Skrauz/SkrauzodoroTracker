import { Component, OnInit } from '@angular/core';
import { TimespansService } from 'src/app/database/timespans/timespans.service';

@Component({
  selector: 'app-analytics-main',
  templateUrl: './analytics-main.component.html',
  styleUrls: ['./analytics-main.component.scss']
})
export class AnalyticsMainComponent implements OnInit {
  constructor(private timespansService: TimespansService) {

  }

  ngOnInit(): void {

  }
}
