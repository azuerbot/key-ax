import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeyAxService {
  public pressedKeys = [];

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
}
