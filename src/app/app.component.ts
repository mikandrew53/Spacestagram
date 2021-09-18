import { Component, HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent { 
  @HostListener('window:resize', ['$event'])
    onResize(event) {
      event.target.innerWidth < 1570 ? this.mobile = true : this.mobile = false;    
  }

  mobile: boolean = (window.innerWidth < 1570);
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
