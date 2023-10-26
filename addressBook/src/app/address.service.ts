import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  of,
  throwError,
  catchError,
  map,
  mergeMap,
  shareReplay,
} from 'rxjs';
import { Person } from './models/person.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private url: string = 'https://randomuser.me/api/';
  private cachedPeople: { [page: number]: Person[] } = {};
  private pageSize = 10;
  getUrl(): string {
    return this.url;
  }

  private handleError(error: any): Observable<never> {
    console.error('error: ', error);
    return throwError(() => error);
  }

  refresh(): void {
    this.cachedPeople = {};
  }

  setPageSize(newSize: number): void {
    this.pageSize = newSize;
    this.refresh();
  }

  getPageSize(): number {
    return this.pageSize;
  }

  getPerson(
    page: number,
    num: number,
    refresh: boolean = false
  ): Observable<Person | undefined> {
    // check if person exists in cache, or if we want refresh
    if (
      this.cachedPeople[page] &&
      this.cachedPeople[page].length > num &&
      !refresh
    ) {
      return of(this.cachedPeople[page][num]);
    }

    return this.getPeople(page, refresh).pipe(
      mergeMap((people) => {
        if (people && people.length > num) {
          return of(people[num]);
        } else {
          // If the person still doesn't exist, return undefined
          return of(undefined);
        }
      }),
      catchError(this.handleError),
      shareReplay(1)
    );
  }

  preloadAdjacentPages(currentPage: number): void {
    const startPage = Math.max(1, currentPage - 2);
    const endPage = currentPage + 2;

    for (let page = startPage; page <= endPage; page++) {
      if (page !== currentPage) {
        // Avoid re-fetching the current page
        this.getPeople(page).subscribe({
          next: (people) => {
            //console.debug(`Page ${page} preloaded`);
          },
          error: (error) => {
            console.error(`Error preloading page ${page}:`, error);
          },
          complete: () => {
            //console.debug(`Preloading of page ${page} completed`);
          },
        });
      }
    }
  }

  // getPeople calls the api and returns an array of Person
  getPeople(page: number, refresh: boolean = false): Observable<Person[]> {
    if (
      this.cachedPeople[page] &&
      this.cachedPeople[page].length > 1 &&
      refresh == false
    ) {
      //console.debug(`${page} already cached`);
      return of(this.cachedPeople[page]);
    }

    //console.debug(`${page} fetch called`);
    return this.http
      .get<{ results: any[] }>(
        `${this.url}?page=${page}&exc=login,id&results=${this.pageSize}&seed=nuvalence`
      )
      .pipe(
        map((response) => {
          this.cachedPeople[page] = response.results.map((item) => {
            const person: Person = {
              name: {
                title: item.name.title,
                firstName: item.name.first,
                lastName: item.name.last,
              },
              gender: item.gender,
              location: {
                streetNumber: item.location.street.number,
                streetName: item.location.street.name,
                country: item.location.country,
                state: item.location.state,
                city: item.location.city,
                postalCode: item.location.postcode,
                timezone: item.location.timezone.offset,
              },
              birthdate: item.dob.date,
              registered: item.registered.date,
              contacts: {
                email: item.email,
                phone: item.phone,
                cell: item.cell,
              },
              nationality: item.nat,
              thumbnail: item.picture.thumbnail,
              portrait: item.picture.large,
            };
            return person;
          });
          return this.cachedPeople[page];
        }),
        catchError(this.handleError),
        shareReplay(1)
      );
  }

  constructor(private http: HttpClient) {}
}
