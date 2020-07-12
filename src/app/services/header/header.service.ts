import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TokenStorageService } from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private cartQty = new Subject<number>();

  cartQty$ = this.cartQty.asObservable();

  constructor(private tokenStorageService: TokenStorageService) {}

  setCartQty(qty: number) {
    this.tokenStorageService.saveCartQty(qty);
    this.cartQty.next(qty);
  }

}
