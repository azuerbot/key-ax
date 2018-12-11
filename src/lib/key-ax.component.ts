import { Component, OnInit, HostListener } from '@angular/core';
import { KEY_CODE } from './data/key-ax-codes.enum';
import { KeyMessages } from './data/key-ax.messages';

@Component({
  selector: 'lib-key-ax',
  templateUrl: './key-ax.component.html',
  styleUrls: ['./key-ax.component.css']
})
export class KeyAxComponent implements OnInit {
  public message: string;
  constructor() { }

  ngOnInit() {
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if (event.keyCode === KEY_CODE.A) {
      this.message = KeyMessages.KEY_PRESSED.replace('[0]', 'A');
    }

    if (event.keyCode === KEY_CODE.B) {
      this.message = KeyMessages.KEY_PRESSED.replace('[0]', 'B');
    }

    if (event.keyCode === KEY_CODE.C) {
      this.message = KeyMessages.KEY_PRESSED.replace('[0]', 'C');
    }

    if (event.keyCode === KEY_CODE.D) {
      this.message = KeyMessages.KEY_PRESSED.replace('[0]', 'D');
    }
  }
}
