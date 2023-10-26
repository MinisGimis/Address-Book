import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AddressService } from './address.service';
import { Person } from './models/person.model';
import { mockResponse } from 'src/assets/mockResponse';

describe('AddressService', () => {
  let service: AddressService;
  let httpMock: HttpTestingController;

  const expectedPeople: Person[] = [
    {
      name: { title: 'Miss', firstName: 'Jennie', lastName: 'Nichols' },
      gender: 'female',
      location: {
        streetNumber: 8929,
        streetName: 'Valwood Pkwy',
        city: 'Billings',
        state: 'Michigan',
        country: 'United States',
        postalCode: '63104',
        timezone: '+9:30',
      },
      birthdate: '1992-03-08T15:13:16.688Z',
      registered: '2007-07-09T05:51:59.390Z',
      contacts: {
        email: 'jennie.nichols@example.com',
        phone: '(272) 790-0888',
        cell: '(489) 330-2385',
      },
      nationality: 'US',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
      portrait: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressService],
    });

    service = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve people from the API via GET', () => {
    service.getPeople(1).subscribe((people) => {
      expect(people).toEqual(expectedPeople);
    });

    const request = httpMock.expectOne(
      `${service.getUrl()}?page=1&exc=login,id&results=10&seed=nuvalence`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });

  it('should handle the error correctly if the API call fails', () => {
    const errorMessage = 'Failed to load';

    service.getPeople(1).subscribe({
      next: (data) => {
        fail('Expected load to fail but didnt');
      },
      error: (error) => {
        expect(error.statusText).toBe(errorMessage);
      },
    });

    const request = httpMock.expectOne(
      `${service.getUrl()}?page=1&exc=login,id&results=10&seed=nuvalence`
    );
    expect(request.request.method).toBe('GET');

    request.flush(null, { status: 500, statusText: errorMessage });
  });
});
