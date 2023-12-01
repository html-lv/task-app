import { Component,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent {

  @Input() selectedProgress: string = '';
  @Output() progressSelected = new EventEmitter<string>();

  selectProgress(progress: string) {
    this.progressSelected.emit(progress);
    console.log(progress)
  }
}
