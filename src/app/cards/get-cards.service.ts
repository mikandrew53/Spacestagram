import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetCardsService {
  key = 's5OVNiFS4HNaCaAzt1sOXhQjhcinvtuOGiWkZ9pD'
  date: string = ''
  startDate: string = ''
  endDate: string = ''
  thumbs: boolean = false
  base: string = 'https://api.nasa.gov/planetary/apod?api_key=s5OVNiFS4HNaCaAzt1sOXhQjhcinvtuOGiWkZ9pD'
  constructor() { }

  async getRandomPics(count:number = 6): Promise<any> {
    console.log();
    
    const nasaResponse = await fetch(`${this.base}&count=${count}&thumbs=true`);
      if(nasaResponse.ok){
          const nasaResponseData = await nasaResponse.json();
          return nasaResponseData;
      }else{
        // return this.getRandomPics();
        throw `Error: ${nasaResponse.status} ${nasaResponse.statusText}`;
      }
  }

  async getPictureWithDateRange(startDate: string, endDate: string): Promise<any>{
    const nasaResponse = await fetch(`${this.base}&start_date=${startDate}&end_date=${endDate}`);
    if (nasaResponse.ok){
      const nasaResponseData = await nasaResponse.json();
          return nasaResponseData;
    }else{
      return this.getPictureWithDateRange(startDate, endDate);
    }
  }
}
