import { Component, HostListener, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { Card } from './CardModle';
import { GetCardsService } from './get-cards.service';
import { NavEventsService } from '../navigation/nav-events.service';
import { NavEvent } from '../navigation/NavEvent';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LikedCardsService } from '../liked-cards.service';


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
  cards: Array<Card> = []
  index = 0;
  home: boolean = true;
  likes: boolean = false;

  likedCards: Array<Card>;

  startDate: string = '';
  endDate: string = '';

  constructor(
    private getCardsService: GetCardsService,
    private nav: NavEventsService,
    private _snackBar: MatSnackBar,
    private likedCardsService: LikedCardsService
    ) { }
    
    ngOnInit(): void {
    this.getCards();
    this.nav.signUpEmail
    .subscribe((event: NavEvent) => {
      if (event.likes && this.likes){
        this._snackBar.open('Already displaying your likes!', 'Okay', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        return;
      }

      if (event.likes && this.likedCardsService.getLikedCards().length < 1){
        this._snackBar.open('No liked pictures!', 'Okay', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 5000
        });
        return;
      }

      if (event.likes && !this.likes){
        this.likes = true;
        this.home = false;
        this.displayLikes();
        return;
      }


      const datesAreDifferent: boolean = (this.startDate !== event.startDate || this.endDate !== event.endDate); 
      this.startDate = event.startDate;
      this.endDate = event.endDate;
      if (event.home && !this.home){
        this.home = true;
        this.resetCards();
        this.getCards();
      }else if((event.startDate !== '' && event.endDate !== '') && datesAreDifferent){
        this.home = false;
        this.getCardsUsingDateRange(event.startDate, event.endDate);
      }else if (event.startDate !== '' && datesAreDifferent){
        this.home = false;
        this.getCardsOnDate(event.startDate);
      }
    })
  }

  displayLikes() {
    console.log('Dsiplay');
    
    this.resetCards();
    this.creatCards(this.likedCardsService.getLikedCards().length);
    this.likedCardsService.getLikedCards().forEach((card:Card) => {
      this.updateCard(card);
    });
    
  }



  getDay(date: string): number{
    if (date[date.length-2] === '-')
      return parseInt(date[date.length-1]);
    else
      return parseInt(`${date[date.length-2]}${date[date.length-1]}`);
  }

  geYearAndMonth(date: string){
    const dayAndYear = [];
    let dashes = 0
    for (let char of date){
      if (char === '-' && dashes === 1)
        break;
      if (char === '-')
        dashes++;
      dayAndYear.push(char);
    }
    return dayAndYear.join('');

  }

  getCardsUsingDateRange(startDate: string, endDate: string){
    if (this.geYearAndMonth(startDate) !== this.geYearAndMonth(endDate)){
      this._snackBar.open('Date range must be in the same month and year!', 'Okay', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000
      });
      return;
    }
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
        imgLoading: true,
        openModal: false
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
    .catch((error: Error) => {
      console.log(error.message);
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
    this.likedCardsService.addLiked(card);
    card.liked = true;
    card.animate = true
    setTimeout(() => card.animate = false , 1000);
  }
  
  onLikeClicked(card: Card){
    card.liked = !card.liked;
    if (card.liked){
      this.likedCardsService.addLiked(card);
      card.animate = true
      setTimeout(() => card.animate = false , 1000);
    }else 
      this.likedCardsService.removeLike(card);
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
    .catch((error: Error) => {
      console.log(error.message);
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
    this.cards[this.index].liked = (card.title in this.likedCardsService.getLikedTitles());
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
