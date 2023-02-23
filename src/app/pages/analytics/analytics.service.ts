import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  taskName?: string;
  projectName?: string;
  startDate?: Date;
  endDate?: Date;
}
