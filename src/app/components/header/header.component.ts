import { ChangeDetectorRef, Component, ViewRef } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Route, routes } from 'src/app/models/joknuden.models';
import { AppService } from 'src/app/services/app.service';
import { RoutingService } from 'src/app/services/routing.service';
import { ArchiveChartsService } from '../charts/archive-charts/archive-charts.service';
import { WindChartsService } from '../charts/wind-charts/wind-charts.service';
import { HiloService } from '../hilo/hilo.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'jok-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss'],
    imports: [
        CommonModule,
        RouterLink, // Only import the directive, not the full module
        FormsModule,
        MatToolbar,
        MatProgressSpinner,
        MatOption,
        MatSelect,
        MatButton,
    ]
})
export class HeaderComponent {

    public get showSpinner(): boolean {
        return this.isFetching;
    }

    public get isDisabled(): boolean {
        return this.isFetching;
    }

    public get isFetching(): boolean {
        return this.archiveChartsService.isFetching || this.windChartsService.isFetching || this.hiloService.isFetching;
    }

    private _isMobile: boolean = window.innerWidth <= 768;
    public get isMobile(): boolean {
        return this._isMobile;
    }

    public routes = routes;
    public selectedRoute: Route;

    constructor(
        private router: Router,
        private routingService: RoutingService,
        private appService: AppService,
        private changeDetectorRef: ChangeDetectorRef,
        private archiveChartsService: ArchiveChartsService,
        private windChartsService: WindChartsService,
        private hiloService: HiloService,
    ) {
        console.log('HeaderComponent', this);
        this.routingService.urlAfterRedirects$.subscribe(urlAfterRedirects => {
            this.selectedRoute = this.routes.find(route => route.route === urlAfterRedirects);
        });
    }

    private detectChanges(): void {
        const viewRef = this.changeDetectorRef as ViewRef;
        if (!viewRef.destroyed) {
            viewRef.detectChanges();
        }
    }

    public navigateToRoute(route: string) {
        this.router.navigate([route]);
    }

}
