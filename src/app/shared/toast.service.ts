import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new Subject<Toast>(); 

  toast$ = this.toastSubject.asObservable();

  

  setToastData(classShow: boolean, bodyText: string) {
    this.toastSubject.next({ classShow, bodyText });
  }
}

export interface Toast {
  classShow: boolean;
  bodyText: string;
}
