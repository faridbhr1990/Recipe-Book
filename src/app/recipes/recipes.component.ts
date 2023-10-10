import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.service';
import { Breadcrumb } from '../breadcrumb/breadcrumb.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  constructor(private breadcrumbService: BreadcrumbService) { }

  ngOnInit() {
    const breadcrumb: Breadcrumb = {
      label: 'Recipes',
      url: '/recipes'
    };
    this.breadcrumbService.addBreadcrumb(breadcrumb);
  }

}
