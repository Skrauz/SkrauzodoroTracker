import { Observable } from 'rxjs';
import { Timespan } from '../../../database/timespans/timespanModel';
import { formatDateEnGB } from './formatDate';

export function constructDatasets(
  timespans$: Observable<Timespan[]>,
  labels?: unknown[],
  filter?: { name?: string; projectName?: string }
): Dataset[] {
  let datasets: Dataset[] = [];

  timespans$.subscribe((timespans) => {
    timespans.forEach((timespan) => {
      const timespanEndDate = new Date(timespan.endTime);
      labels?.forEach((label, index) => {
        if (label == formatDateEnGB(timespanEndDate)) {
          let dataset: Dataset = {
            data: [],
            label: '',
            backgroundColor: 'rgba(230, 129, 0, 0.9)',
            borderWidth: 2,
            borderColor: 'rgba(255, 255, 255, 0.9)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)',
            fill: 'origin',
          };

          let labelProject =
            timespan.project != 'Unnamed Project' ? `${timespan.project}` : '';
          if (filter?.projectName && filter?.projectName != labelProject) {
            return;
          }
          let labelTaskName = timespan.name
            ? `${timespan.name}`
            : 'Unnamed Task';
          if (filter?.name && filter?.name != labelTaskName) {
            return;
          }

          if (labelProject) {
            dataset.label = labelProject + '; ' + labelTaskName;
          } else {
            dataset.label = labelTaskName;
          }

          dataset.data[index] = getTimeDifference(
            timespan.endTime,
            timespan.startTime
          );

          datasets.push(dataset);
        }
      });
    });
  });
  return datasets;
}

function getTimeDifference(date1: Date, date2: Date): number {
  let difference = Math.abs(
    new Date(date1).valueOf() - new Date(date2).valueOf()
  );
  return difference / 60000;
}

interface Dataset {
  data: any[];
  label: string;
  backgroundColor: string;
  borderWidth: number;
  borderColor: string;
  pointBackgroundColor: string;
  pointBorderColor: string;
  pointHoverBackgroundColor: string;
  pointHoverBorderColor: string;
  fill: string;
}
