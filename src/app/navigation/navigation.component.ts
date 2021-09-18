import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Card } from '../cards/CardModle';
import { LikedCardsService } from '../liked-cards.service';
import { NavEventsService } from './nav-events.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  minDate: Date;
  maxDate: Date;
  likedCards: Array<Card>;
  likedCardsTitles;
  
  @ViewChild('dateRangeStart', {static: true}) dateRangeStart:ElementRef;
  @ViewChild('dateRangeEnd', {static: true}) dateRangeEnd:ElementRef;

  constructor(
    private navEvents: NavEventsService,
    private likedCardsService: LikedCardsService
    ) { }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1995, 5, 16);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.likedCards = this.likedCardsService.getLikedCards();
    this.likedCardsTitles = this.likedCardsService.getLikedTitles();
  }

  dateRangeChange(dateRangeStart: any, dateRangeEnd: any){
    if (dateRangeStart === '' && dateRangeEnd === '')
      return
    dateRangeStart = this.parseDate(dateRangeStart)
    if (dateRangeEnd !== '')
      dateRangeEnd = this.parseDate(dateRangeEnd)
    this.navEvents.emitNavEvent({home: false, likes: false, startDate: dateRangeStart, endDate: dateRangeEnd}) 
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
    this.navEvents.emitNavEvent({home: true, likes: false , startDate: '', endDate: ''})
  }
  
  onLikesClick() {
    this.navEvents.emitNavEvent({home: false, likes: true , startDate: '', endDate: ''})
  }

  cardClicked(card: Card){
    card.openModal = true;
  }
}
