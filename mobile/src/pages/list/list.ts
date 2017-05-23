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
  items: Array<{title: string, job: string, thumb: string, description: string}>;
  serviceType: any;
  metaData: {title: string, subtitle: string};

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http,
    private speakerService: DataService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.serviceType = navParams.get('serviceType');

    this.selectedItem = navParams.get('item');

    this.items = [];

    speakerService = new this.serviceType(http);

    this.metaData = speakerService.getMetaData();

    speakerService.getData()
    .subscribe(data => {
      data.forEach(item => {
        this.items.push({
          title: item.name,
          job: item.job_title,
          thumb: item.avatar_url,
          description: item.description
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
