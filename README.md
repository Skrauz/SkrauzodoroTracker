# Skrauzodoro Tracker - MEAN Time Tracking and Management Tool

Skrauzodoro Tracker is a customizable fullstack time tracking and management tool built with the MEAN (MongoDB, ExpressJS, Angular, NodeJS) stack. The application came from my need for a straightforward time tracking solution, capable of analysing gathered records.
App is capable of tracking time spent working on specific tasks and projects using a classic stopwatch or a <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank">Pomodoro Technique</a>.

![tracking overview](https://user-images.githubusercontent.com/89979928/223772460-9e015a3d-0971-4299-9ed0-4c08b94e4c33.png)

<hr>

The records are then saved to a local MongoDB database and are available to be viewed in the Analytics tab.

![analytics](https://user-images.githubusercontent.com/89979928/224037933-f5c8391b-0682-476d-90a6-a3c526fcb573.png)

<hr>

User is able to create, read, update and delete projects. In addition to adjusting settings and integrating with Todoist through the Todoist API.

![modals](https://user-images.githubusercontent.com/89979928/224047229-e36c6178-3022-4ffc-9ddc-f585eace95cf.png)

<hr>

## How to run the project
  1. Download and install MongoDB Community Server - https://www.mongodb.com/try/download/community
  2. Clone the serverside part of the application - https://github.com/Skrauz/SkrauzodoroTracker-Server (it's mandatory for full functionality)
  3. Run `npm install` and `npm start` in server's directory
  4. Clone this repo
  5. Run `npm install` and `ng serve -o` in client's directory to serve the and project automatically navigate to `http://localhost:4200/`


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

<hr>

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.4.
