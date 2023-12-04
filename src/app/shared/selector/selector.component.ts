import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  @Input() selectedProgress: string = '';
  @Input() selectedStatus: string = '';
  @Output() progressSelected = new EventEmitter<string>();
  @Input() showProgress = false;
  @Input() showTask = false;
  itemForm: FormGroup;
  constructor(){
    this.itemForm = new FormGroup({
      progress: new FormControl('',Validators.required),
      status: new FormControl('',Validators.required)
    })
  }

  selectProgress(progress: string) {
      this.progressSelected.emit(progress)
  }
  selectTask(status: string){
      this.progressSelected.emit(status)
  }



  progressOptions = [
    { value: 'Task need to do', label: 'To do' },
    { value: 'Task in progress', label: 'In progress' },
    { value: 'Task is done', label: 'Test' },
    { value: 'Task in production', label: 'Prod' }
  ];

  statusOptions = [
    { value: 'Test is ready', label: 'Test ready' },
    { value: 'Test passed', label: 'Test passed' },
    { value: 'Test failed', label: 'Test failed' }
  ];
  onSubmit(){

  }
  
}
