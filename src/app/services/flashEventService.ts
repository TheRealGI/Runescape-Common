import { Injectable } from "@angular/core";
import { FlashEvent } from "../model/FlashEvent";

@Injectable({providedIn: 'root'})
export class FlashEventService {
    private readonly BASE_WILDERNESS_FLASH_EVENT_LINK = "https://runescape.wiki/w/Wilderness_Flash_Events#"
    public events = [
        {name: "Spider Swarm", value:0, link:"Spider_Swarm"},
        {name: "Unnatural Outcrop", value:1, link:"Unnatural_Outcrop"},
        {name: "Stryke the Wyrm -Special", value:2, link:"Stryke_the_Wyrm"},
        {name: "Demon Stragglers", value:3, link:"Demon_Stragglers"},
        {name: "Butterfly Swarm", value:4, link:"Butterfly_Swarm"},
        {name: "King Black Dragon Rampage -Special", value:5, link:"King_Black_Dragon_Rampage"},
        {name: "Forgotten Soldiers", value:6, link:"Forgotten_Soldiers"},
        {name: "Surprising Seedlings", value:7, link:"Surprising_Seedlings"},
        {name: "Hellhound Pack", value:8,link:"Hellhound_Pack"},
        {name: "Infernal Star -Special", value:9, link:"Infernal_Star"},
        {name: "Lost Souls", value:10, link:"Lost_Souls"},
        {name: "Ramokee Incursion", value:11, link:"Ramokee_Incursion"},
        {name: "Displaced Energy", value:12, link:"Displaced_Energy"},
        {name: "Evil Bloodwood Tree -Special", value:13, link:"Evil_Bloodwood_Tree"},
        ];
    public originDate = new Date(Date.UTC(2024,2,14,18));

    constructor(){}

    public getRotationByTimeSpanAndSelection(to: Date, from: Date, selectedEvents: number[]): FlashEvent[] {
        var lastEvent = this.getLastFlashEventByCurrentHourUTC(from);
        var nextEventsDuringTimespan = this.getEventsDuringTimestamp(to, from, lastEvent);
        return selectedEvents != null ? nextEventsDuringTimespan.filter(event => selectedEvents.includes(event.value)) : nextEventsDuringTimespan;
    }

    private getEventsDuringTimestamp(to: Date, from: Date, lastEvent: number): FlashEvent[] {
        var eventsDuringTimestamp: FlashEvent[] = [];
        var copyFrom = new Date(from.getTime()); 
        while(copyFrom < to) {
            copyFrom.setUTCHours(copyFrom.getUTCHours()+ 1);
            lastEvent = (lastEvent + 1) % this.events.length;
            eventsDuringTimestamp.push(
                {   name: this.events[lastEvent].name,
                    value: this.events[lastEvent].value,
                    date: copyFrom.toUTCString(),
                    link: `${this.BASE_WILDERNESS_FLASH_EVENT_LINK}${this.events[lastEvent].link}`
                });
        }
        return eventsDuringTimestamp
    }

    private getLastFlashEventByCurrentHourUTC(current: Date): number {
        let hoursSinceRelease =  Math.trunc(Math.abs(current.valueOf() - this.originDate.valueOf()) / 3600000);
        return this.events[(hoursSinceRelease) % this.events.length].value;
    }
}