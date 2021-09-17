import { Component, OnInit } from '@angular/core';
import { NavEventsService } from './nav-events.service';




@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  minDate: Date | undefined;
  maxDate: Date | undefined;
  constructor(private navEvents: NavEventsService) { }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1995, 5, 16);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
    this.navEvents.emitNavEvent({home: true, startDate: '', endDate: ''})
  }

  

}
