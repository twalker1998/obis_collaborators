import { Component, Input } from '@angular/core';
import { Option } from '../../../shared/models/option';

@Component({
  selector: 'app-select-box',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.css']
})
export class SelectBoxComponent {
  @Input() array: Array<Option>;

  constructor() { }
}
