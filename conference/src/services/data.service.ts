import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class DataService {
    getData(): Observable<any[]>{
        return null;
    }

    getMetaData(): any {
        return {
            title: 'List',
            subtitle: 'Sub text.'
        };
    }
}