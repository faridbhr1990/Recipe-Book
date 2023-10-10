import { Injectable } from '@angular/core';
import { Breadcrumb } from './breadcrumb.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  layer1 = new Subject<String>() ;

  private breadcrumbs: Breadcrumb[] = [];

  constructor() { }

  // getCurrentStage(){
  //   this.layer1.subscribe();
  // }

  addBreadcrumb(breadcrumb: Breadcrumb) {
    this.breadcrumbs.push(breadcrumb);
  }

  getBreadcrumbs() {
    return this.breadcrumbs;
  }
}