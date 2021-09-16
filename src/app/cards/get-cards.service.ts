import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCardsService {
  key = 's5OVNiFS4HNaCaAzt1sOXhQjhcinvtuOGiWkZ9pD'
  date: string = ''
  startDate: string = ''
  endDate: string = ''
  count: number = 6
  thumbs: boolean = false
  base: string = 'https://api.nasa.gov/planetary/apod?api_key='
  constructor() { }

  async getSixRandomPics(): Promise<any> {
    console.log('yo');
    
    const nasaResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${this.key}&count=${this.count}&thumbs=true`);
      if(nasaResponse.ok){
          const nasaResponseData = await nasaResponse.json();
          return nasaResponseData;
      }else{
        return this.getSixRandomPics();
        // throw `Error: ${nasaResponse.status} ${nasaResponse.statusText}`;
      }
  }
}
