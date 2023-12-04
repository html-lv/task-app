import { Component, Input } from '@angular/core';
import { GenService } from '../../services/gen.service';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {

  @Output() newItemEvent = new EventEmitter<any[]>();
  selectedProg = '';
  selectedProd = '';
  itemForm: FormGroup;
  

  constructor(public genSer: GenService){
    this.itemForm = new FormGroup({
      name: new FormControl('',[Validators.required,Validators.maxLength(15)]),
      description: new FormControl('', Validators.required),
      // status: new FormControl('',Validators.required),
      // progress: new FormControl('',Validators.required)
    })
  }
  onProgressSelected(selectedProgress: string) {
    this.selectedProg = selectedProgress;
  }
  onSelectedTask(selectedTest: string){
    this.selectedProd = selectedTest
  }
  task: any = {};
  tasks: any[] = [];

  addTask(){
    this.task.selectedProd = this.selectedProd;
    this.task.progress = this.selectedProg;
    console.log(this.task)
    if (this.itemForm.valid) {
      this.newItemEvent.emit({ ...this.task });
      this.task = {};
      this.genSer.showModal = false;
    } else {
      console.error('Error');
    }
  }
}
