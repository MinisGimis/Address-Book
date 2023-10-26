import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {
  mockActivatedRoute,
  mockAddressService,
  mockPerson,
} from 'src/assets/mockResponse';
import { AddressService } from '../address.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsComponent, ButtonComponent],
      imports: [FontAwesomeModule],
      providers: [
        { provide: AddressService, useValue: mockAddressService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch person and match name', () => {
    component.fetchPerson(1);
    fixture.detectChanges();

    component.person$?.subscribe((person) => {
      if (person) {
        const expectedName = `${mockPerson.name.title} ${mockPerson.name.firstName} ${mockPerson.name.lastName}`;
        const actualName = `${person.name.title} ${person.name.firstName} ${person.name.lastName}`;
        expect(actualName).toEqual(expectedName);
      } else {
        fail('Person data is undefined');
      }
    });
  });

  it('should display name correctly in the DOM', () => {
    const expectedName = `${mockPerson.name.title} ${mockPerson.name.firstName} ${mockPerson.name.lastName}`;

    const nameElement: HTMLElement = fixture.nativeElement.querySelector(
      '.address-book-details-name'
    );
    expect(nameElement.textContent).toContain(expectedName);
  });
});
