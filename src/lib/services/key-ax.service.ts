import { Injectable } from '@angular/core';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class KeyAxService {
  private pressedKeys = [];
  private counter = 1000;
  private counting = false;
  private lastLenght = 0;

  constructor() { }

  public addPressedKeys(key: string) {
    this.pressedKeys.push(key);
  }

  public getPressedKeys(): any[] {
    return this.pressedKeys;
  }

  public clearPressedKeys() {
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

  public clearCounter() {
    this.counting = false;
  }

  public setLastLength(lastLenght: number) {
    this.lastLenght = lastLenght;
  }

  public getLastLength(): number {
    return this.lastLenght;
  }

}
