import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerStatusComponent } from './seller-status.component';

describe('SellerStatusComponent', () => {
  let component: SellerStatusComponent;
  let fixture: ComponentFixture<SellerStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
