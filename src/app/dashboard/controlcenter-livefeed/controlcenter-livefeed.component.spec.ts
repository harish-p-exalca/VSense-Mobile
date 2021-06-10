import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ControlcenterLivefeedComponent } from './controlcenter-livefeed.component';

describe('ControlcenterLivefeedComponent', () => {
  let component: ControlcenterLivefeedComponent;
  let fixture: ComponentFixture<ControlcenterLivefeedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlcenterLivefeedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlcenterLivefeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
