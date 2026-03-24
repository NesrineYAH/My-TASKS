import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListeComponent } from './new-task.component';

describe('NewListeComponent', () => {
  let component: NewListeComponent;
  let fixture: ComponentFixture<NewListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
