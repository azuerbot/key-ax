import { Directive, HostListener, Input, ElementRef, ContentChild } from '@angular/core';
import { KeyAxService } from '../services/key-ax.service';
import { timer, Observable } from 'rxjs';
import { Console } from '@angular/core/src/console';
import { ChromeShorcuts } from '../data/chrome-shortcuts.enum';

@Directive({
  selector: '[key-Ax]'
})
export class KeyAxDirective {
  @Input() combokeys: [];
  public message: string;

  constructor(private keyaxService: KeyAxService, private element: ElementRef) {

   }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log('Initial input value: ', this.element.nativeElement.value);
    this.keyaxService.addTime();
    if (!this.combokeys) {
      return;
    }

    this.keyaxService.addPressedKeys(event.key);
    const comboTrack = this.combokeys.map(() => 0);

    if (!this.keyaxService.getCounting()) {
      this.countTime(comboTrack);
    } else {
      console.log(`Adding new key pressed ($(event.key))...`);
    }

  }

  public countTime(comboTrack: any[number]) {
    this.keyaxService.setCounting();
    const expectedTime = 1;

    let executor = timer(expectedTime * 1000);
    let subscriber = executor.subscribe(() => {
      const allKeys = this.keyaxService.getPressedKeys();
      this.executeCombo(allKeys, comboTrack);
// tslint:disable-next-line: no-use-before-declare
      counter.unsubscribe();
    });

    const counter = timer(1000, 1000)
    .subscribe((second) => {
      const allKeys = this.keyaxService.getPressedKeys();
      if (allKeys.length > this.keyaxService.getLastLength()) {
        // Adding more time
        subscriber.unsubscribe();
        executor = timer(expectedTime * 1000);
        subscriber = executor.subscribe(() => {
          this.executeCombo(allKeys, comboTrack);
        });
        this.keyaxService.setLastLength(allKeys.length);
      } else if (second === expectedTime) {
        this.executeCombo(allKeys, comboTrack);
        subscriber.unsubscribe();
        counter.unsubscribe();
      }
    });
  }

  public checkKeyCombo(keyCodes: any[], comboTrack: any[]): boolean {
    let f = 0;
    let pressedKeys = '';
    this.combokeys.forEach((key, index) => {
      keyCodes.forEach(keyCode => {
        pressedKeys = pressedKeys + ' + ' + keyCode;
        if (key === keyCode) {
          comboTrack[index] = 1;
          f++;
        }
      });
    });
    let validCombo = (comboTrack.filter((i) => i === 1).length === this.combokeys.length);
    validCombo = !this.containsChromeShortcuts(pressedKeys);
    console.log('validCombo: ', validCombo);
    this.keyaxService.clearPressedKeys();
    return validCombo;
  }

  private containsChromeShortcuts(keyCombo: string) {
    for (const item in ChromeShorcuts) {
      if (!Number(item)) {
        if (keyCombo === ChromeShorcuts[item]) {
          return true;
        }
      }
    }
    return false;
  }

  private executeCombo(allKeys: any[], comboTrack: any[]) {
    if (this.checkKeyCombo(allKeys, comboTrack)) {
      this.element.nativeElement.value = 'Test worked';
      this.element.nativeElement.focus();
    }
    this.keyaxService.clearCounter();
  }

}
