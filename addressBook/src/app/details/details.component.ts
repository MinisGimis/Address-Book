import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '../address.service';
import { Location } from '@angular/common';
import { Person } from '../models/person.model';
import { Observable } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  person$: Observable<Person | undefined> | undefined;
  loading: boolean = true;
  error: boolean = false;
  copyIcon = faCopy;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id && id > 0) {
      this.fetchPerson(id);
    }
  }

  getCountryName(countryCode: string): string {
    const countryNames: { [key: string]: string } = {
      AU: 'Australia',
      BR: 'Brazil',
      CA: 'Canada',
      CH: 'Switzerland',
      DE: 'Germany',
      DK: 'Denmark',
      ES: 'Spain',
      FI: 'Finland',
      FR: 'France',
      GB: 'United Kingdom',
      IE: 'Ireland',
      IN: 'India',
      IR: 'Iran',
      MX: 'Mexico',
      NL: 'Netherlands',
      NO: 'Norway',
      NZ: 'New Zealand',
      RS: 'Serbia',
      TR: 'Turkey',
      UA: 'Ukraine',
      US: 'United States',
    };
    return countryNames[countryCode] || countryCode;
  }

  copyToClipboard(text: string): void {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        //console.debug('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Error in copying text: ', err);
      });
  }

  //assuming id > 0
  fetchPerson(id: number): void {
    const pageSize = this.addressService.getPageSize();
    const page = Math.ceil(id / pageSize);
    const index = (id - 1) % pageSize;

    this.person$ = this.addressService.getPerson(page, index);
    const personObserver = {
      next: () => {
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      },
      complete: () => {
        //console.debug('Person fetch completed');
      },
    };

    this.person$.subscribe(personObserver);
  }

  goBack(): void {
    this.location.back();
  }
}
