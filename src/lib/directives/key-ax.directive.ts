import { Directive, HostListener, Input, ElementRef, ContentChild } from '@angular/core';
import { KeyAxService } from '../services/key-ax.service';
import { timer, Observable } from 'rxjs';
import { Console } from '@angular/core/src/console';

@Directive({
  selector: '[key-Ax]'
})
export class KeyAxDirective {
  @Input() combokeys: [];
  public message: string;

  constructor(private keyaxService: KeyAxService, private element: ElementRef) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    this.keyaxService.addTime();

    console.log('event: ', event);
    console.log('Combo keys configuration: ', this.combokeys);

    if (!this.combokeys) {
      return;
    }

    this.keyaxService.addKeys(event.key);
    const comboTrack = this.combokeys.map(() => 1);
    if (!this.keyaxService.getCounting()) {
      this.countTime(comboTrack);
    } else {
      console.log(`Adding new key pressed ($(event.key))...`);
    }

  }

  public countTime(comboTrack: any[number]) {
    this.keyaxService.setCounting();
    const expectedTime = 2;

    let executor = timer(expectedTime * 1000);
    let subscriber = executor.subscribe(() => {
      console.log('Time ended so keys need to be checked');
      const allKeys = this.keyaxService.getKeys();
      this.executeCombo(allKeys, comboTrack);
    });

    const counter = timer(1000, 1000)
    .subscribe((second) => {
        console.log('Looping timer, second: ', second);
        const allKeys = this.keyaxService.getKeys();

        console.log('Validating if having the same keys pressed.');
        if (allKeys.length > this.keyaxService.getLastLength()) {

          // Adding more time
          console.log('Unsubscribing the old executor!');
          subscriber.unsubscribe();
          console.log('Creating the executor again!');
          executor = timer(expectedTime * 1000);

          console.log('Subscribing to the new executor!');
          subscriber = executor.subscribe(() => {
            this.executeCombo(allKeys, comboTrack);
          });
          console.log('Setting new keys array length: ', allKeys.length);
          this.keyaxService.setLastLength(allKeys.length);
        } else if (second === expectedTime) {
          console.log('Timer finished abd this are all  the Keys collected: ', allKeys);
          this.executeCombo(allKeys, comboTrack);
          console.log('Unsubscribing counter!!');
          counter.unsubscribe();
        }
    });
  }

  public checkKeyCombo(keyCodes: any[], comboTrack: any[]): boolean {
    this.combokeys.forEach(key => {
      keyCodes.forEach(keyCode => {
        console.log('Validating if the pressed keys match with the configuration.');
        if (key !== keyCode) {
          comboTrack.push(0);
        }
      });
    });
    const validCombo = (comboTrack.filter((i) => i === 0).length >= 1);
    this.keyaxService.clear();
    return validCombo;
  }

  private executeCombo(allKeys: any[], comboTrack: any[]) {
    if (this.checkKeyCombo(allKeys, comboTrack)) {
      console.log('Combo success!!');
      this.element.nativeElement.value = 'Test worked';
      console.log('Keys pressed: ', allKeys.join(','));
      this.element.nativeElement.focus();
    }
  }

}
