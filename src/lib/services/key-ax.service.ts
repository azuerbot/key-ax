import { Injectable } from '@angular/core';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KeyAxService {
  public pressedKeys = [];
  public counter = 1000;
  public counting = false;
  public lastLenght = 0;

  constructor() { }

  public addKeys(key: string) {
    this.pressedKeys.push(key);
  }

  public getKeys(): any[] {
    return this.pressedKeys;
  }

  public clear() {
    this.pressedKeys = [];
  }

  public addTime() {
    this.counter = this.counter + 1000;
    return this.counter;
  }

  public setCounting() {
    this.counting = true;
  }

  public getCounting(): boolean {
    return this.counting;
  }

  public setLastLength(lastLenght: number) {
    this.lastLenght = lastLenght;
  }

  public getLastLength(): number {
    return this.lastLenght;
  }

}
