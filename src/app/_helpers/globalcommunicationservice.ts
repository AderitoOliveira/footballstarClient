import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { excerciseDetailData }  from '../_models/exercise_detail';

@Injectable()
export class GlobalCommunicationService {

    private _exerciseDetailData : excerciseDetailData;
    private messageSource = new BehaviorSubject('Main Page');
    currentMessage = this.messageSource.asObservable();

    private dataExchange = new BehaviorSubject<excerciseDetailData>(this._exerciseDetailData);
    currentData = this.dataExchange.asObservable();

    getData() {
        return name;
    }

    changeData(data: string) {
        this.messageSource.next(data);
    }

    getDataExchange() {
        return name;
    }

    changeDataExchange(data: any) {
        this.dataExchange.next(data);
    }
}