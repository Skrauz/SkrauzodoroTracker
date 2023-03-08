import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(array: any, sortBy: string, order?: any): any[] {
    const sortOrder: boolean | 'asc' | 'desc' = order? order : 'asc';
    return orderBy(array, [sortBy], [sortOrder]);
  }
}
