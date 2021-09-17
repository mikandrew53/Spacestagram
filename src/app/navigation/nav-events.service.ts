import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavEvent } from './NavEvent';

@Injectable({
  providedIn: 'root'
})
export class NavEventsService {
  signUpEmail = new Subject<NavEvent>();
  constructor() { }

  emitNavEvent(navEvent: NavEvent){
    this.signUpEmail.next(navEvent);
  }
}
