import { Injectable } from '@angular/core';
import { Timespan } from './timespanModel';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimespansService {
  constructor(private httpClient: HttpClient) {}

  private url = "http://localhost:5200";
  private timespans$: Subject<Timespan[]> = new Subject();

  // Read
  private refreshTimespans() {
    // if in the api each CRUD operation was on the different address, the requests would look like this
    // this.httpClient.get<Timespan[]>(`${this.url}/api/gettimespans`)
    this.httpClient.get<Timespan[]>(`${this.url}/api/timespans`)
    .subscribe((timespans) => {
      this.timespans$.next(timespans);
    })
  }
  getTimespans(): Subject<Timespan[]> {
    this.refreshTimespans();
    return this.timespans$;
  }

  // Create
  createTimespan(timespan: Timespan): Observable<string> {
    // return this.httpClient.post(`${this.url}/api/createtimespan`, timespan, {responseType: "text"})
    return this.httpClient.post(`${this.url}/api/timespans`, timespan, {responseType: "text"})
  }
}
