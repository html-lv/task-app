import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenService } from '../services/gen.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css'],
})
export class DropComponent implements OnInit{
  title = 'work';
  @Input() makeSearch:string = '';
  

  constructor(public genService: GenService){ 
    this.loadItem();
  }

  ngOnInit() {
  }
  
  showAdd(){
    this.genService.showModal = true;
  }


  todoItems: any[] = [];
  inProgressItems: any[] = [];
  testItems: any[] = [];
  prodItems: any[] = [];
  anyMatches = false;
  matchingItems: any[] = [];
  items: any[] = [
    ...this.todoItems,
    ...this.inProgressItems,
    ...this.testItems,
    ...this.prodItems
  ];

  searchMatch(searchTerm: string): void {
    this.matchingItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.anyMatches = this.matchingItems.length > 0;
    console.log(this.matchingItems);
      this.anyMatches = true;
  }


  addItems(newItem: any){
    switch (newItem.progress) {
      case 'Task need to do':
        newItem.selectedProg = 'Task need to do'
        this.todoItems.push(newItem)
        console.log(this.todoItems)
        // this.todoItems = [...this.todoItems, newItem];
        this.saveItem();
        break;
      case 'Task in progress':
        newItem.selectedProg = 'Task in progress'
        this.inProgressItems = [...this.inProgressItems, newItem];
        console.log(this.inProgressItems)
        this.saveItem();
        break;
      case 'Task is done':
        newItem.selectedProg = 'Task in test'
        this.testItems = [...this.testItems, newItem];
        console.log(this.testItems)
        this.saveItem();
        break;
      case 'Task in production':
        newItem.selectedProg = 'Task in production'
        this.prodItems = [...this.prodItems, newItem];
        console.log(this.prodItems)
        break;
    }
    this.saveItem();
  }
  private saveItem() {
    this.todoItems = this.todoItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
    this.inProgressItems = this.inProgressItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
    this.testItems = this.testItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
    this.prodItems = this.prodItems.filter(item => item.name.toLowerCase().includes(this.makeSearch.toLowerCase()));
  
    this.items = [
      ...this.todoItems,
      ...this.inProgressItems,
      ...this.testItems,
      ...this.prodItems
    ];
  
    localStorage.setItem('key', JSON.stringify(this.items));
    localStorage.setItem('todo', JSON.stringify(this.todoItems));
    localStorage.setItem('inProgress', JSON.stringify(this.inProgressItems));
    localStorage.setItem('test', JSON.stringify(this.testItems));
    localStorage.setItem('prod', JSON.stringify(this.prodItems));
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
  @Input() dataToEdit: any;
  @Input() selectedTask: any;
  selectedIndex = 0;

  selectItem(item: any, index: number) {
    this.selectedIndex = index;
    this.selectedTask = item;
    this.genService.showEdit = true;
  }

  drop(event: CdkDragDrop<string[]>, list: any){
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.saveItem()
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      switch(event.container.id){
        case 'test-list':
          list[event.currentIndex].selectedProg = 'Task in test'
        break;
        case 'in-progress-list':
          list[event.currentIndex].selectedProg = 'Task in progress'
        break;
        case 'todo-list':
          list[event.currentIndex].selectedProg = 'Task need to do'
        break;
        case 'prod-list':
          list[event.currentIndex].selectedProg = 'Task in production'
        break;
      }
      this.saveItem()
    }
    this.saveItem()
  }
}
