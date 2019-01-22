import { Directive, HostListener, Input, ElementRef, ContentChild } from '@angular/core';
import { KeyAxService } from './key-ax.service';

@Directive({
  selector: '[libKeyAx]'
})
export class KeyAxDirective {
  @Input() keyax: [];
  public message: string;

  constructor(private keyaxService: KeyAxService, private element: ElementRef) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    console.log(this.keyax);
    if (!this.keyax) {
      return;
    }

    this.keyaxService.addKeys(event.key);
    const comboTrack = this.keyax.map(() => 1);


    setTimeout(() => {
      const allKeys = this.keyaxService.getKeys();
      console.log('allKeys: ', allKeys);
      if (this.checkKeyCombo(allKeys, comboTrack)) {
        this.element.nativeElement.textContent = 'Test worked';
        this.element.nativeElement.focus();
      }
    }, 2000);

  }

  public checkKeyCombo(keyCodes: any[], comboTrack: any[]): boolean {
    this.keyax.forEach(key => {
      keyCodes.forEach(keyCode => {
        if (key !== keyCode) {
          comboTrack.push(0);
        }
      });
    });
    const validCombo = (comboTrack.filter((i) => i === 0).length >= 1);
    this.keyaxService.clear();
    return validCombo;
  }

}
