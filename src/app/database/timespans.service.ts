import { Injectable } from '@angular/core';
import { Timespan } from './timespanModel';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimespansService {
  constructor(private httpClient: HttpClient) {}

  // private url = "http://localhost:5050";
  private url = "http://localhost:5050/api/timespans";

  private timespans$: Subject<Timespan[]> = new Subject();

  // READ
  private refreshTimespans() {
    // if in the api each CRUD operation was on the different address, the requests would look like this
    // this.httpClient.get<Timespan[]>(`${this.url}/api/gettimespans`)
    this.httpClient.get<Timespan[]>(this.url)
    .subscribe((timespans) => {
      this.timespans$.next(timespans);
    })
  }
  getTimespans(): Subject<Timespan[]> {
    this.refreshTimespans();
    return this.timespans$;
  }

  // CREATE
  createTimespan(timespan: Timespan): Observable<string> {
    // return this.httpClient.post(`${this.url}/api/createtimespan`, timespan, {responseType: "text"})
    let response = this.httpClient.post(this.url , timespan, {responseType: "text"});
    response
    .subscribe({
      next: () => {
        // console.log('Timespan saved succesfuly');
      },
      error: (err) => {
        alert('Failed to create a timespan');
        console.error(err);
      },
    });
    return response;
  }
}
