import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, ParamMap } from '@angular/router';
import { filter, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { BreadCrumb } from '../../core/models';
import { CustomerService } from '../../core/services/customer.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd),
      distinctUntilChanged(),
      map(event => this.buildBreadCrumb(this.activatedRoute.root))
    ).subscribe(res => this.breadcrumbs = res);
  }

  /**
   * Build breadcrumb from route
   * 
   * @param route activated route
   * @param url router path
   * @param breadcrumbs list of of breadcrumbs
   * @returns list of breadcrumbs
   */
  buildBreadCrumb(route: ActivatedRoute, url: string = '',
    breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {

    const label = route.routeConfig ? route.routeConfig.data['breadcrumb'] : '';
    const path = route.routeConfig ? route.routeConfig.path : '';
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl,
      active: false,
    };

    if (breadcrumb.label == ':id') {
      const customerID = route.snapshot.paramMap.get('id');
      this.customerService.get(customerID).subscribe(res => breadcrumb.label = `${res.firstName}'s details`);
    }

    let newBreadcrumbs = [...breadcrumbs, breadcrumb];

    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }

    newBreadcrumbs = newBreadcrumbs.filter(res => res.label != '');
    newBreadcrumbs[newBreadcrumbs.length - 1]['active'] = true;

    return newBreadcrumbs;
  }

}