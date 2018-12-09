import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAxComponent } from './key-ax.component';

describe('KeyAxComponent', () => {
  let component: KeyAxComponent;
  let fixture: ComponentFixture<KeyAxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyAxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyAxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
