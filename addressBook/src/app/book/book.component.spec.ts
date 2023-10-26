import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BookComponent } from './book.component';
import { AddressService } from '../address.service';
import { mockAddressService } from 'src/assets/mockResponse';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from '../button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent, ButtonComponent],
      imports: [RouterTestingModule, FontAwesomeModule],
      providers: [{ provide: AddressService, useValue: mockAddressService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist', () => {
    expect(component).toBeTruthy();
  });

  it('should have currentPage > 0 after init', () => {
    component.ngOnInit();
    expect(component.currentPage).toBeGreaterThan(0);
  });

  it('should be 10 people rendered from mock data', () => {
    const count = fixture.debugElement.queryAll(
      By.css('.address-book-list-container')
    ).length;
    expect(count).toBe(10);
  });
});
