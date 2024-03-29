import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';

export interface ConsoleData {
    barometer?: number;
    dateTime?: number;
    dayRain?: number;
    heatindex?: number;
    outHumidity?: number;
    outTemp?: number;
    windDir?: number | null;
    windGust?: number;
    windGustDir?: number | null;
    windSpeed?: number;
}

@Injectable({
    providedIn: 'root',
})
export class ConsoleService {

    private static readonly webSocketReconnectTime: number = 1000;
    private static readonly maxWebSocketReconnectTime: number = 30000;

    private webSocketReconnectTime: number = ConsoleService.webSocketReconnectTime;

    private _socket: WebSocket;

    private _data$: BehaviorSubject<ConsoleData> = new BehaviorSubject(null);
    public get data$(): Observable<ConsoleData> {
        return this._data$;
    }
    public get data(): ConsoleData {
        return this._data$.value;
    }

    constructor(
    ) {
        console.log(this);
        this.openWebSocket();
        return;
        const random = () => Math.round(Math.random() * 10);
        interval(800).subscribe(() => {
            this._data$.next({
                barometer: 950 + random() * 10,
                dateTime: Date.now(),
                dayRain: random(),
                heatindex: random(),
                outHumidity: random() * 10,
                outTemp: random(),
                windDir: random(),
                windGust: random(),
                windGustDir: random(),
                windSpeed: random(),
            });
        });
    }

    private async openWebSocket(): Promise<void> {

        console.log('newSocket', this.webSocketReconnectTime);

        const location = window.location;
        let protocol: string;
        let port: number;
        const isSecureProtocol = location.protocol.includes('s');
        if (isSecureProtocol) {
            protocol = 'wss';
            port = 443;
        }
        else {
            protocol = 'ws';
            port = 8080;
        }

        this._socket = new WebSocket(`${ protocol }://${ location.hostname }:${ port }/ws`);

        this._socket.addEventListener('open', (test: any) => {
            this.webSocketReconnectTime = 1000;
        });

        this._socket.addEventListener('error', (error: any) => {
            console.log('socket error', error);
        });

        this._socket.addEventListener('close', (event: CloseEvent) => {
            setTimeout(() => {
                this.openWebSocket();
                this.webSocketReconnectTime = this.webSocketReconnectTime * 2;
                if (this.webSocketReconnectTime > ConsoleService.maxWebSocketReconnectTime) {
                    this.webSocketReconnectTime = ConsoleService.maxWebSocketReconnectTime;
                }
            }, this.webSocketReconnectTime);
        });

        this._socket.addEventListener('message', (message: MessageEvent) => {
            // console.log(message);
            if (message && message.data) {
                const consoleData: ConsoleData = JSON.parse(message.data);
                // console.log(consoleData);
                if (consoleData && consoleData.dateTime) {
                    this._data$.next(consoleData);
                }
            }
        });

}


}
