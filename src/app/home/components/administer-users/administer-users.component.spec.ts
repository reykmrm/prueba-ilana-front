import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministerUsersComponent } from './administer-users.component';

describe('AdministerUsersComponent', () => {
  let component: AdministerUsersComponent;
  let fixture: ComponentFixture<AdministerUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministerUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministerUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
