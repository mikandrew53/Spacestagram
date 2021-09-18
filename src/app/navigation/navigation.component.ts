import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LikedCardsService } from '../liked-cards.service';
import { NavEventsService } from './nav-events.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  minDate: Date | undefined;
  maxDate: Date | undefined;
  likedCardService: LikedCardsService;
  Object = Object;
  @ViewChild('dateRangeStart', {static: true}) dateRangeStart:ElementRef;
  @ViewChild('dateRangeEnd', {static: true}) dateRangeEnd:ElementRef;
  constructor(
    private navEvents: NavEventsService,
    private likedCards: LikedCardsService
    ) { }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1995, 5, 16);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.likedCardService = this.likedCards;
  }

  dateRangeChange(dateRangeStart: any, dateRangeEnd: any){
    if (dateRangeStart === '' && dateRangeEnd === '')
      return
    dateRangeStart = this.parseDate(dateRangeStart)
    if (dateRangeEnd !== '')
      dateRangeEnd = this.parseDate(dateRangeEnd)
    this.navEvents.emitNavEvent({home: false, startDate: dateRangeStart, endDate: dateRangeEnd}) 
  }

  parseDate(date: string){
    let string = []
    for(let i = date.length -4; i< date.length; i++)
      string.push(date[i]);
    
    string.push('-');
    let dashes = 0
    for (let char of date){

      if (char === '/' && dashes === 1)
        break
      if (char === '/'){
        dashes++
        string.push('-')
        continue;
      }
      string.push(char);
    }
    return string.join('');
    
    
  }

  onLogoClick(){
    // this.dateRangeStart.nativeElement.value = '';
    // this.dateRangeEnd.nativeElement.value = '';
    this.navEvents.emitNavEvent({home: true, startDate: '', endDate: ''})
  }

  cardClicked(card){
    console.log(card);
    
  }

  

}
