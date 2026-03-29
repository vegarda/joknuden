
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArchiveChartsService } from './archive-charts.service';
import { BarometerChartComponent } from './barometer-chart/barometer-chart.component';
import { TemperatureChartComponent } from './temperature-chart/temperature-chart.component';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { WindChartComponent } from './wind-chart/wind-chart.component';




@Component({
    selector: 'jok-archive-charts',
    templateUrl: 'archive-charts.component.html',
    styleUrls: ['archive-charts.component.scss'],
    imports: [
        BarometerChartComponent,
        TemperatureChartComponent,
        WindChartComponent,
        MatCardTitle,
        MatCard,
    ]
})
export class ArchiveChartsComponent implements OnInit {

    constructor(
        private archiveChartsService: ArchiveChartsService,
    ) { }

    public async ngOnInit(): Promise<void> {



    }


}

