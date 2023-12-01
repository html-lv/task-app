import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItems'
})
export class FilterItemsPipe implements PipeTransform {

  transform(allItems: any[], makeSearch: string): any {
    if (!allItems || !allItems) {
      return allItems;
    }
    makeSearch = makeSearch.toLowerCase();
    return allItems.filter(item => item.name.toLowerCase().includes(makeSearch));
  }  
}
