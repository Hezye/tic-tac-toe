import { Injectable } from '@angular/core';

@Injectable()
export class Logger {
    logs: string[] = [];

    constructor() { }

    log(message: string) {
        this.logs.push(message);
        console.log(message);
    }
}
