import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { DataService } from "./data.service";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class InvestorsService implements DataService {

    apiUrl: string = 'https://desolate-wave-28351.herokuapp.com/api/investors';
    
    constructor(private http: Http){
    }

    getMetaData(){
        return {
            title: 'Investors',
            subtitle: 'Previous Investors That Joined Us'
        }
    }

    getData(): Observable<any[]> {
        return this.http.get(this.apiUrl)
            .map( this.extractData )
            .catch( this.handleError );
    }

    private extractData(res: Response) {
        let data = res.json().dataitem;
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