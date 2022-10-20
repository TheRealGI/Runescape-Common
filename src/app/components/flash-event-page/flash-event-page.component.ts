import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FlashEvent } from 'src/app/model/FlashEvent';
import { FlashEventService } from 'src/app/services/flashEventService';

@Component({
  selector: 'app-flash-event-page',
  templateUrl: './flash-event-page.component.html',
  styleUrls: ['./flash-event-page.component.scss']
})
export class FlashEventPageComponent {
 
  public fromDate: FormControl<Date> = new FormControl;
  public toDate: FormControl<Date> = new FormControl;
  public selectedEvents: FormControl<number[]> = new FormControl;
  public eventsRotation: FlashEvent[] = [];

  public events: {name: string, value: number}[]

  constructor(private flashEventService: FlashEventService) { 
    this.events = this.flashEventService.events;
    this.initForm();
    if(this.selectedEvents.valid) this.loadRotation();

    this.toDate.valueChanges.subscribe(toDate => {
      if(toDate && this.selectedEvents.valid) {
        this.loadRotation();
      }
    });

    this.selectedEvents.valueChanges.subscribe(selectedEvents => {
      window.localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
      if(selectedEvents && selectedEvents.length > 0 && this.toDate.valid) {
        this.loadRotation();
      }
    });
  }

  private initForm(): void {
    var currentDate = new Date();
    var dateTomorrow = new Date().setHours(currentDate.getHours() + 24);
    this.fromDate.setValue(currentDate);
    this.toDate.setValue(new Date(dateTomorrow));
    this.toDate.setValidators(Validators.required);
    this.selectedEvents.setValue(JSON.parse(window.localStorage.getItem('selectedEvents') as string));
    this.selectedEvents.setValidators(Validators.required);
  }

  private loadRotation() {
    this.eventsRotation = this.flashEventService.getRotationByTimeSpanAndSelection(this.toDate.value, this.fromDate.value, this.selectedEvents.value);
  }
}
