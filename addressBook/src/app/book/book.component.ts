import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { AddressService } from '../address.service';
import { Router, ActivatedRoute } from '@angular/router';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  people$?: Observable<Person[]>;
  loading: boolean = true;
  error: boolean = false;
  currentPage: number = 1;
  numPerPage: number = 10;
  arrowIcon = faArrowRight;

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pageParam = params.get('page');
      const page = pageParam ? Number(pageParam) : 1;

      this.currentPage = page > 1 ? page : 1;
      this.numPerPage = this.addressService.getPageSize();

      this.fetchPeople(this.currentPage);
    });
  }

  fetchPeople(page: number): void {
    this.people$ = this.addressService.getPeople(page);
    const peopleObserver = {
      next: () => {
        this.addressService.preloadAdjacentPages(page);
      },

      error: () => {
        this.loading = false;
        this.error = true;
      },
      complete: () => {
        this.error = false;
        //console.debug('People fetch completed');
        this.loading = false;
      },
    };

    this.people$.subscribe(peopleObserver);
  }

  nextPage(): void {
    this.currentPage++;
    this.router.navigate(['/book', this.currentPage]);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.router.navigate(['/book', this.currentPage]);
    }
  }

  goToDetails(index: number): void {
    this.router.navigate([
      '/detail',
      (this.currentPage - 1) * this.numPerPage + index + 1,
    ]);
  }
}
