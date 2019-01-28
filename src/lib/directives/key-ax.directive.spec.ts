import { KeyAxDirective } from './key-ax.directive';
import { KeyAxService } from '../services/key-ax.service';
import { ElementRef } from '@angular/core';

describe('KeyAxDirective', () => {
  const keyaxService = new KeyAxService();
  const element = new ElementRef('');

  it('should create an instance', () => {
    const directive = new KeyAxDirective(keyaxService, element);
    expect(directive).toBeTruthy();
  });
});
