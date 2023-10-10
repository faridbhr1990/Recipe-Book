import { Component } from '@angular/core';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { Breadcrumb } from './breadcrumb/breadcrumb.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipebook';

  constructor(private breadcrumbService: BreadcrumbService , private activatedRoute : ActivatedRoute , private route:ActivatedRoute) { }

  ngOnInit() {
    this.route?.firstChild?.data.subscribe(data => {
      const x = data['breadcrumb'];
      debugger 
    });

    
    // const breadcrumb: Breadcrumb = {
    //   label: ,
    //   url: this.activatedRoute
    // };
    this.breadcrumbService.getBreadcrumbs();
  }
}
