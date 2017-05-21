import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, thumb: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.items = [];

    http.get('https://1daycache.websummit.com/v1/conferences/companies/madmin/lists/top-50-previously-at-our-events/info?limit=15')
    .map( this.extractData )
    .subscribe(people => {
      people.forEach(item => {
        this.items.push({
          title: item.full_name,
          note: item.job_title,
          thumb: item.medium_image
        })
      });
    });

    // // Let's populate this page with some filler content for funzies
    // this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    // 'american-football', 'boat', 'bluetooth', 'build'];

    
    // for (let i = 1; i < 11; i++) {
    //   this.items.push({
    //     title: 'Item ' + i,
    //     note: 'This is item #' + i,
    //     icon: this.icons[Math.floor(Math.random() * this.icons.length)]
    //   });
    // }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ListPage, {
      item: item
    });
  }

  private extractData(res: Response) {
    let body = res.json().people;
    return body || { };
  }
}
