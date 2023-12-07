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
  @Input() selectedTaskName = '';
  @Output() taskUpdated = new EventEmitter<any>();
  @Output() taskDeleted = new EventEmitter<void>();
  @Output() progressSelected = new EventEmitter<string>();

  selectedProg = '';
  selectedProd = '';


  isEdited = false;

  openTab(){
    this.isEdited = !this.isEdited;
  }

  updateTask() {
    if(this.selectedTaskName === ''){
      this.selectedTaskName
    } else {
      console.log(this.selectedTaskName);
      console.log(this.selectedProd)
      console.log(this.selectedTask)
      this.selectedTask.selectedProd = this.selectedProd
      this.selectedTask.name = this.selectedTaskName
      this.taskUpdated.emit();
    }

}

  deleteTask() {
    console.log(this.selectedTask)
    this.taskDeleted.emit();
  }


  onProgressSelected(selectedProgress: string) {
    this.selectedProg = selectedProgress;
  }
  onSelectedTask(selectedTest: string){
    this.selectedProd = selectedTest
  }
}
