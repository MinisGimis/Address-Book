import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { faSync } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private addressService: AddressService, private router: Router) {}
  syncIcon = faSync;

  goHome(): void {
    this.router.navigate(['/']);
  }

  refreshEverything(): void {
    this.addressService.refresh();
    this.router.navigate(['/']);
  }
}
