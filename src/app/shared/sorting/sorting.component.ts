import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent {
  constructor(){
    this.loadItem()
  }

 @Input() items: any[] = [];
 @Input() todoItems: any[] = [];
 @Input() inProgressItems: any[] = [];
 @Input() testItems: any[] = [];
 @Input() prodItems: any[] = [];
 @Input() makeSearch = '';
 @Output() sortEvent = new EventEmitter<any[]>();

 sortByTest() {
  console.log(this.testItems)
  this.testItems.sort((a, b) => {
    const nameA = a.selectedProd.toUpperCase();
    const nameB = b.selectedProd.toUpperCase();
    if (nameA > nameB) {
      return -1;
    } else if (nameA < nameB) {
      return 1;
    } else {
      return 0;
    }
  });
  this.sortEvent.emit(this.testItems);
  this.saveItem();
}
sortByName() {
  this.todoItems.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });
  this.sortEvent.emit(this.todoItems);
  this.saveItem();
}
  addItems(newItem: any){
    switch (newItem.progress) {
      case 'Task need to do':
        newItem.selectedProg = 'Task need to do'
        this.todoItems = [...this.todoItems, newItem];
        break;
      case 'Task in progress':
        newItem.selectedProg = 'Task in progress'
        this.inProgressItems = [...this.inProgressItems, newItem];
        break;
      case 'Task is done':
        newItem.selectedProg = 'Task is done'
        this.testItems = [...this.testItems, newItem];
        break;
      case 'Task in production':
        newItem.selectedProg = 'Task in production'
        this.prodItems = [...this.prodItems, newItem];
        break;
    }
    this.saveItem();
  }
  private saveItem() {
    localStorage.setItem('key', JSON.stringify(this.items));
    localStorage.setItem('todo', JSON.stringify(this.todoItems));
    localStorage.setItem('inProgress', JSON.stringify(this.inProgressItems));
    localStorage.setItem('test', JSON.stringify(this.testItems));
    localStorage.setItem('prod', JSON.stringify(this.prodItems));
    this.todoItems = this.todoItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
    this.inProgressItems = this.inProgressItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
    this.testItems = this.testItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
    this.prodItems = this.prodItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
  }
  private loadItem() {
    const store = localStorage.getItem('key');
    this.items = store ? JSON.parse(store) : [];
    
    const todoStore = localStorage.getItem('todo');
    this.todoItems = todoStore ? JSON.parse(todoStore) : [];
  
    const inProgressStore = localStorage.getItem('inProgress');
    this.inProgressItems = inProgressStore ? JSON.parse(inProgressStore) : [];
  
    const testStore = localStorage.getItem('test');
    this.testItems = testStore ? JSON.parse(testStore) : [];
  
    const prodStore = localStorage.getItem('prod');
    this.prodItems = prodStore ? JSON.parse(prodStore) : [];
  }; 
}
