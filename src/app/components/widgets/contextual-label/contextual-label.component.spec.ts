import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ContextualLabelComponent } from './contextual-label.component';

describe('ContextualLabelComponent', () => {
  let component: ContextualLabelComponent;
  let fixture: ComponentFixture<ContextualLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ContextualLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextualLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
