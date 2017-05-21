import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { DetailPage } from '../detail/detail';
// Services
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [DataService]
})

export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, thumb: string}>;
  serviceType: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    private speakerService: DataService) {
    // If we navigated to this page, we will have an item available as a nav param
    console.log(navParams.get('pageType'));

    this.serviceType = navParams.get('pageType');

    this.selectedItem = navParams.get('item');

    this.items = [];

    speakerService = new this.serviceType(http);

    speakerService.getData()
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
    this.navCtrl.push(DetailPage, {
      item: item
    });
  }
}
