/* Angular */
import { ComponentFixture, TestBed } from '@angular/core/testing';

/* Components */
import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {

  let component!: SidebarComponent;
  let fixture!: ComponentFixture<SidebarComponent>;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent]
    }).compileComponents();
  });

  beforeEach((): void => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
