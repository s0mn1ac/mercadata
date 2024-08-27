import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUploaderComponent } from './ticket-uploader.component';

describe('TicketUploaderComponent', () => {
  let component: TicketUploaderComponent;
  let fixture: ComponentFixture<TicketUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketUploaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
