import { Component, HostListener, OnInit } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {FormGroup, FormControl} from '@angular/forms';
import { HeartFillService } from '../heart-fill.service';
import { Card } from './CardModle';
import { GetCardsService } from './get-cards.service';


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
      if (scrolledToBottom) {
        this.getCards();
      }
    // console.log($event);
    
    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //   console.log('Bottom');
      
    // }
    // console.log("scrolling");
  } 
  faHeart = faHeart;
  faHeartFill: any;
  cards: Array<Card> = []
  items = [1, 1, 1]
  index = 0;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private heartFill: HeartFillService, private GetCards: GetCardsService){
    this.faHeartFill = this.heartFill.getHeart();
  }

  ngOnInit(): void {
    this.getCards();
  }

  getCards(){
    for(let i = 0; i < 6; i++){
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
        display: true
      })
    }

    this.GetCards.getSixRandomPics().then(data => {
      console.log(data);
      data.forEach((card: Card) => {
        console.log(card.url);
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
      });
      
    })
    .catch(error => {
      
      
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

}
