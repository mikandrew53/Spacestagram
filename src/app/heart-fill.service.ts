import { Injectable } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
@Injectable({
  providedIn: 'root'
})
export class HeartFillService {
  private faHeart = faHeart
  constructor() { }
  getHeart() {
    return this.faHeart;
  }
}
