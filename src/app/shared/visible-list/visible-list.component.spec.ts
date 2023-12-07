import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibleListComponent } from './visible-list.component';

describe('VisibleListComponent', () => {
  let component: VisibleListComponent;
  let fixture: ComponentFixture<VisibleListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisibleListComponent]
    });
    fixture = TestBed.createComponent(VisibleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
