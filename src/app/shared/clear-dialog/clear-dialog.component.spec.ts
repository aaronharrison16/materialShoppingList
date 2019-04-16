import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearDialogComponent } from './clear-dialog.component';

describe('ClearDialogComponent', () => {
  let component: ClearDialogComponent;
  let fixture: ComponentFixture<ClearDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClearDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
