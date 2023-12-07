import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GenService } from '../services/gen.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  title = 'work';
  @Input() makeSearch = '';

  constructor(public serv: GenService){ 
    this.loadItem();
  }

  ngOnInit() {
  }
  
  showAdd(){
    this.serv.showModal = true;
  }

  @Input() items: any[] = [];
  @Input() todoItems: any[] = [];
  @Input() inProgressItems: any[] = [];
  @Input() testItems: any[] = [];
  @Input() prodItems: any[] = [];


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
    this.serv.showEdit = true;
  }
  updateTask() {
      this.selectedTask[this.selectedIndex].name = this.selectedTask.name
      console.log(this.selectedTask[this.selectedIndex])
      this.saveItem();
}

  deleteTask(){
    const selectedProg = this.selectedTask[this.selectedIndex].selectedProg;
      switch(selectedProg){
          case 'Task need to do':
          this.todoItems.splice(this.selectedIndex, 1)
          console.log(this.todoItems)
          break;
          case 'Task in progress':
          this.inProgressItems.splice(this.selectedIndex, 1)
          console.log(this.inProgressItems)
          break;
          case 'Task in test':
          this.testItems.splice(this.selectedIndex, 1)
          console.log(this.testItems)
          break;
          case 'Task in production':
          this.prodItems.splice(this.selectedIndex, 1)
          console.log(this.prodItems)
          break;
      }

      this.items = [
        ...this.todoItems,
        ...this.inProgressItems,
        ...this.testItems,
        ...this.prodItems,
      ];

      this.saveItem();
      this.serv.showEdit = false;
    }
  
  drop(event: CdkDragDrop<string[]>, list: any){
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log(this.todoItems)
      console.log(this.inProgressItems)
      console.log(this.testItems)
      console.log(this.prodItems)
      this.saveItem();
      this.loadItem();
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
