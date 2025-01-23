import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterTextPipe implements PipeTransform {

  transform(value: any[], filterText: any): any {
    if (!value) {
      return [];
    }
    if (!filterText) {
      return value;
    }

    filterText = filterText.toLowerCase();

    return value.filter(val => {
      if (!val.text && !val.title){
      return false;
      }

      const textMatches = val.text && val.text.toLowerCase().includes(filterText);
      const titleMatches = val.title && val.title.toLowerCase().includes(filterText);

      return textMatches || titleMatches;
    });
  }
}