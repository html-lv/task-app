import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-visible-list',
  templateUrl: './visible-list.component.html',
  styleUrls: ['./visible-list.component.css']
})
export class VisibleListComponent {
  @Input() listId: string = '';
  @Input() items: any[] = [];
  @Input() makeSearch = '';
  @Output() itemDropped = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<any>();
  
  
  drop(event: any) {
    if (!this.items) {
      this.items = [];
    }
    this.itemDropped.emit(event);
  }
  selectItem(item: any, index: number) {
    this.itemSelected.emit(index);
  }
}