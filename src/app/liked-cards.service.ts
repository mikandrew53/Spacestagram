import { Injectable } from '@angular/core';
import { Card } from './cards/CardModle';
@Injectable({
  providedIn: 'root'
})
export class LikedCardsService {
  private likedCards: Array<Card> = []
  private likedTitles = {};
  constructor() {
    if (localStorage.getItem('titles') !== null && localStorage.getItem('cards') !== null){
      this.likedTitles = JSON.parse(localStorage.getItem('titles'));
      this.likedCards = JSON.parse(localStorage.getItem('cards'));
    }
    
  }

  addLiked(card:Card){
    if (card.title in this.likedTitles)
      return;
    this.likedTitles[card.title] = this.likedCards.length;
    this.likedCards.push(card);
    this.updateLocalStorage();
  }


  removeLike(card: Card){
    this.likedCards.splice(this.likedTitles[card.title], 1);
    delete this.likedTitles[card.title];
    this.likedCards.forEach((likedCard: Card, i) => this.likedTitles[likedCard.title] = i);
    this.updateLocalStorage();
  }

  getLikedCards(){
    return this.likedCards;
  }

  getLikedTitles(){
    return this.likedTitles;
  }

  private updateLocalStorage(){
    localStorage.setItem('titles', JSON.stringify(this.likedTitles));
    localStorage.setItem('cards', JSON.stringify(this.likedCards));
  }
}
