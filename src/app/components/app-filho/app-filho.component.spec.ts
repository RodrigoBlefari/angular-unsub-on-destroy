import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFilhoComponent } from './app-filho.component';

describe('AppFilhoComponent', () => {
  let component: AppFilhoComponent;
  let fixture: ComponentFixture<AppFilhoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppFilhoComponent]
    });
    fixture = TestBed.createComponent(AppFilhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
