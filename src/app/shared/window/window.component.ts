import { Component,Input,Output,EventEmitter } from '@angular/core';
import { GenService } from '../services/gen.service';

@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.css']
})
export class WindowComponent {
  constructor(public genSer: GenService){
    
  }

  @Input() dataToEdit:any;
  @Input() selectedTask: any; 
  @Output() taskUpdated = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<void>();


  isEdited = false;

  openTab(){
    this.isEdited = !this.isEdited;
  }

  updateTask() {
    this.taskUpdated.emit(this.selectedTask);
  }

  deleteTask() {
    this.taskDeleted.emit();
  }

}