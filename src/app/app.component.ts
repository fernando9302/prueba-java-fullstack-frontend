import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { Breadcrumb } from './model/breadcrumb';
import { BreadcrumbService } from './service/breadcrumb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {  
  title = 'mediapp-frontend';

  breadcrumbs$: Observable<Breadcrumb[]>; 
 
  constructor(private readonly breadcrumbService: BreadcrumbService) { 
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$; 
  } 
  
}
