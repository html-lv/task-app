import { Component, Input, OnInit } from '@angular/core';
import { GenService } from '../services/gen.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drop',
  templateUrl: './drop.component.html',
  styleUrls: ['./drop.component.css'],
})
export class DropComponent implements OnInit{
  title = 'work';
  showTest = false;
  shosProg = false;
  makeSearch = '';

  constructor(public genService: GenService){ 
    this.loadItem();
  }

  ngOnInit() {
  }
  
  showAdd(){
    this.genService.showModal = true;
  }

  items: any[] = [];
  todoItems: any[] = [];
  inProgressItems: any[] = [];
  testItems: any[] = [];
  prodItems: any[] = [];

  addItems(newItem: any){
    switch (newItem.progress) {
      case 'Task need to do':
        this.todoItems = [...this.todoItems, newItem];
        break;
      case 'Task in progress':
        this.inProgressItems = [...this.inProgressItems, newItem];
        break;
      case 'Task is done':
        this.testItems = [...this.testItems, newItem];
        break;
      case 'Task in production':
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
  @Input() dataToEdit: any;
  @Input() selectedTask: any;
  selectedIndex = 0;

  selectItem(item: any, index: number) {
    this.selectedIndex = index;
    this.selectedTask = item;
    this.genService.showEdit = true;
  }

  updateTask(updatedTask: any) {
    const index = this.items.findIndex(item => item === this.selectedIndex);
      this.items[index] = { ...updatedTask };
      this.saveItem();
  }

  deleteTask(){
      let selectedList: any[];
  
      switch (this.selectedTask.selectedProg) {
        case 'Task need to do':
          console.log('Task need to do')
          selectedList = this.todoItems;
          break;
        case 'Task in progress':
          console.log('Task in progress')
          selectedList = this.inProgressItems;
          break;
        case 'Task in test':
          console.log('Task in test')
          selectedList = this.testItems;
          break;
        case 'Task in production':
          console.log('Task in production')
          selectedList = this.prodItems;
          break;
        default:
          selectedList = this.items;
          break;
      }
      const indexOfSelectedItem = selectedList.findIndex(item => item === this.selectedTask);
      if (indexOfSelectedItem !== -1) {
        selectedList.splice(indexOfSelectedItem, 1);
      }
      this.saveItem();
      this.genService.showEdit = false;
    }

  sortByTest(){
    this.testItems.sort((a,b) => {
      const nameA = a.selectedProd.toUpperCase();
      const nameB = b.selectedProd.toUpperCase();
      if (nameA > nameB) {
        return -1;
      } else if (nameA < nameB) {
        return 1;
      } else {
        return 0;
      };
    })
    this.saveItem()
  }
  sortByName(){
    this.todoItems.sort((a,b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      } else if (nameA > nameB) {
        return 1;
      } else {
        return 0;
      };
    })
    this.saveItem()
  }
  
  drop(event: CdkDragDrop<string[]>, list: any){
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.saveItem()
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
      console.log(event.container.id)
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
