import { Injectable } from "@angular/core";
import { FlashEvent } from "../model/FlashEvent";

@Injectable({providedIn: 'root'})
export class FlashEventService {
    public events = [
        {name: "Spider Swarm", value:0},
        {name: "Unnatural Outcrop", value:1},
        {name: "Demon Stragglers", value:2},
        {name: "Butterfly Swarm", value:3},
        {name: "King Black Dragon Rampage -Special", value:4},
        {name: "Forgotten Soldiers", value:5},
        {name: "Surprising Seedlings", value:6},
        {name: "Hellhound Pack", value:7},
        {name: "Infernal Star -Special", value:8},
        {name: "Lost Souls", value:9},
        {name: "Ramokee Incursion", value:10},
        {name: "Displaced Energy", value:11},
        {name: "Evil Bloodwood Tree -Special", value:12},
        ];
    public originDate = new Date(Date.UTC(2022,9,17,11));

    constructor(){}

    public getRotationByTimeSpanAndSelection(to: Date, from: Date, selectedEvents: number[]): FlashEvent[] {
        var lastEvent = this.getLastFlashEventByCurrentHourUTC(from);
        var nextEventsDuringTimespan = this.getEventsDuringTimestamp(to, from, lastEvent);
        return nextEventsDuringTimespan.filter(event => selectedEvents.includes(event.value))
    }

    private getEventsDuringTimestamp(to: Date, from: Date, lastEvent: number): FlashEvent[] {
        var eventsDuringTimestamp: FlashEvent[] = [];
        var copyFrom = new Date(from.getTime()); 
        while(copyFrom < to) {
            copyFrom.setUTCHours(copyFrom.getUTCHours()+ 1);
            lastEvent = (lastEvent + 1) % this.events.length;
            eventsDuringTimestamp.push({name: this.events[lastEvent].name, value: this.events[lastEvent].value, date: copyFrom.toUTCString()});
        }
        return eventsDuringTimestamp
    }

    private getLastFlashEventByCurrentHourUTC(current: Date): number {
        let hoursSinceRelease =  Math.trunc(Math.abs(current.valueOf() - this.originDate.valueOf()) / 3600000);
        return this.events[(hoursSinceRelease) % this.events.length].value;
    }
}