import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTheBankComponent } from './about-the-bank.component';

describe('AboutTheBankComponent', () => {
  let component: AboutTheBankComponent;
  let fixture: ComponentFixture<AboutTheBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTheBankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutTheBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
