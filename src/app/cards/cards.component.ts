import { Component, HostListener, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {FormGroup, FormControl} from '@angular/forms';
import { HeartFillService } from '../heart-fill.service';
import { Card } from './CardModle';
import { GetCardsService } from './get-cards.service';
import { NavEventsService } from '../navigation/nav-events.service';
import { NavEvent } from '../navigation/NavEvent';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) onScrollEvent($event: any){
    let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
      let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
      let scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight;
      if (scrolledToBottom && this.home) {
        this.getCards();
      }
  } 
  faHeart = faHeart;
  faHeartFill: any;
  cards: Array<Card> = []
  index = 0;
  home: boolean = true;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private heartFill: HeartFillService, 
    private getCardsService: GetCardsService,
    private nav: NavEventsService
    ) { }
    
    ngOnInit(): void {
    this.faHeartFill = this.heartFill.getHeart();
    this.getCards();
    this.nav.signUpEmail
    .subscribe((event: NavEvent) => {
      if (event.home && !this.home){
        this.home = true;
        this.resetCards();
        this.getCards();
      }else if(event.startDate !== '' && event.endDate !== ''){
        this.home = false;
        this.getCardsUsingDateRange(event.startDate, event.endDate);
      }else if (event.startDate !== ''){
        this.home = false;
        this.getCardsOnDate(event.startDate);
      }
    })
  }

  getDay(date: string): number{
    if (date[date.length-2] === '-')
      return parseInt(date[date.length-1]);
    else
      return parseInt(`${date[date.length-2]}${date[date.length-1]}`);
  }

  getCardsUsingDateRange(startDate: string, endDate: string){
    const numOfDays = this.getDay(endDate) - this.getDay(startDate) + 1;
    this.resetCards();
    this.creatCards(numOfDays);
    this.getCardsService.getPictureWithDateRange(startDate, endDate).then((cards: Array<Card>) => {
      cards.forEach((card:Card) => {
        this.updateCard(card);
      });
    });
  }
  getCardsOnDate(date: string){
    this.resetCards();
    this.creatCards(1);
    this.getCardsService.getPictureOnDate(date)
    .then((card: Card) => {
      this.updateCard(card)
    })
    .catch((error: any) => {
      console.log(error);
      
    });
  }

  creatCards(numberOfCards:number = 6) {
    for(let i = 0; i < numberOfCards; i++){
      this.cards.push({
        date: '',
        explanation: "",
        hdurl: '',
        media_type: '',
        service_version: '',
        title: '',
        url: '',
        liked: false,
        animate: false,
        loading: true,
        imgSrc: '',
        display: true,
        imgLoading: true
      })
    }
  }

  getCards(){
    this.creatCards();
    this.getCardsHelper();
  }
  
  getCardsHelper(){
    this.getCardsService.getRandomPics().then(data => {
      this.parseCards(data);
    })
    .catch((error: any) => {
      console.log(error);
      this.getCardsHelper();
    });
    
  }


  parseCards(cards: Array<Card>){
    cards.forEach((card: Card) => {
      if (card.media_type !== "image")
        return this.getCard();
      this.updateCard(card);
    });
  }

  onImgdbclick(card: Card) {
    card.liked = true;
    card.animate = true
    setTimeout(() => card.animate = false , 1000);
  }
  
  onLikeClicked(card: Card){
    card.liked = !card.liked;
    if (card.liked){
      card.animate = true
      setTimeout(() => card.animate = false , 1000);
    }
  }

  onImgLoad(card: Card){
    card.imgLoading = false;
  }

  getCard(){
    this.getCardsService.getRandomPics(1).then((card: Array<Card>) => {
      if (card[0].media_type !== "image" )
        this.getCard();
      else
        this.updateCard(card[0]);
    })
    .catch((error: any) => {
      console.log(error);
      this.getCard();
    });
  }

  updateCard(card: Card){
    this.cards[this.index].date = card.date;
    this.cards[this.index].explanation = card.explanation;
    this.cards[this.index].hdurl = card.hdurl;
    this.cards[this.index].url = card.url;
    this.cards[this.index].title = card.title;
    this.cards[this.index].service_version = card.service_version;
    this.cards[this.index].media_type = card.media_type;
    this.cards[this.index].loading = false;
    if (card.hdurl !== '')
      this.cards[this.index].imgSrc = card.hdurl;
    else
      this.cards[this.index].imgSrc = card.url;
    this.index++; 
  }

  resetCards(){
    this.index = 0;
    this.cards = [];
  }

}
