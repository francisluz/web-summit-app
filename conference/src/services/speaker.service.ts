import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';


@Injectable()
export class SpeakerService implements DataService {

    apiUrl: string = 'https://1daycache.websummit.com/v1/conferences/companies/madmin/lists/top-50-previously-at-our-events/info?limit=15';
    
    constructor(private http: Http){
    }

    getData(): Observable<any[]> {
        return this.http.get(this.apiUrl)
            .map( this.extractData )
            .catch( this.handleError );
    }

    private extractData(res: Response) {
        let data = res.json().people;
        return data || { };
    }


    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}