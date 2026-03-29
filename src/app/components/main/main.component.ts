import { Component } from '@angular/core';
import { Action, AppService } from 'src/app/services/app.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HeaderComponent } from '../header/header.component';
import { ConsoleComponent } from '../console/console.component';
import { ArchiveChartsComponent } from '../charts/archive-charts/archive-charts.component';
import { WindChartsComponent } from '../charts/wind-charts/wind-charts.component';
import { FooterComponent } from '../footer/footer.component';
import { MaterialModule } from 'src/app/modules/material.modules';
import { MatCard } from '@angular/material/card';

@Component({
    selector: 'jok-main',
    templateUrl: 'main.component.html',
    styleUrls: ['main.component.scss'],
    imports: [
        MatCard,
        HeaderComponent,
        ConsoleComponent,
        ArchiveChartsComponent,
        WindChartsComponent,
        FooterComponent,
    ]
})
export class MainComponent {

    constructor(
        private routingService: RoutingService,
        private appService: AppService,
    ) {
        console.log('MainComponent', this);
    }

    public toggleSidenav(): void {
        this.appService.doAction(Action.ToggleSidenav);
    }

}
