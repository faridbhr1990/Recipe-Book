import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from './breadcrumb.service';
import { Breadcrumb } from './breadcrumb.interface';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs !: Breadcrumb[];

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs();
  }
}