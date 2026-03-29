import { Component } from '@angular/core';
import { Action, AppService } from 'src/app/services/app.service';
import { RoutingService } from 'src/app/services/routing.service';
import { HiloComponent } from '../hilo/hilo.component';

@Component({
    selector: 'jok-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.scss'],
    imports: [
        HiloComponent,
    ]
})
export class FooterComponent {

    constructor(
        private routingService: RoutingService,
        private appService: AppService,
    ) {
        console.log('FooterComponent', this);
    }

}
