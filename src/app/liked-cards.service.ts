import { Injectable } from '@angular/core';
import { Card } from './cards/CardModle';
@Injectable({
  providedIn: 'root'
})
export class LikedCardsService {
  private likedCards: Array<Card> = []
  private likedTitles = {};
  constructor() { }

  addLiked(card:Card){
    if (card.title in this.likedTitles)
      return;
    this.likedTitles[card.title] = this.likedCards.length;
    this.likedCards.push(card);
  }

  removeLike(card: Card){
    this.likedCards.splice(this.likedTitles[card.title], 1);
    delete this.likedTitles[card.title];
    this.likedCards.forEach((likedCard: Card, i) => this.likedTitles[likedCard.title] = i);
  }

  getLikedCards(){
    return this.likedCards;
  }

  getLikedTitles(){
    return this.likedTitles;
  }
}
