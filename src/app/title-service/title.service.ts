import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor() { }

  title: string = '';
  set(input: string) {
    this.title = `${input} Skrauzodoro Timer`;
  }
  get(): string {
    return this.title;
  }
  // Doesn't work, look up how to make a dynamic title in angular
}
