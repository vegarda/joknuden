import { Component, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { Action, AppService } from './services/app.service';
import { RoutingService } from './services/routing.service';
import { RouterOutlet } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';
// import { AppModule } from './app.module';

@Component({
    selector: 'jok-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        RouterOutlet, // Only import the directive, not the full module
        // AppRoutingModule, // Do not import AppRoutingModule in standalone component
        // AppModule, // Do not import AppModule in standalone component
        MatDrawer,
        MatDrawerContent,
        MatDrawerContainer,
    ]
})
export class AppComponent {

    @ViewChild(MatDrawer, { static: true }) private drawer!: MatDrawer;

    constructor(
        private routingService: RoutingService,
        private appService: AppService,
    ) {
        console.log('AppComponent ', this);

        this.appService.action$.subscribe(action => {
            switch(action) {
                case Action.CloseSidenav: {
                    this.drawer.close();
                    break;
                }
                case Action.OpenSidenav: {
                    this.drawer.open();
                    break;
                }
                case Action.ToggleSidenav: {
                    this.drawer.toggle();
                    break;
                }
            }
        });

    }

}
