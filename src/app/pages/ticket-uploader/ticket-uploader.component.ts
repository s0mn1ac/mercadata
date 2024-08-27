import { Component } from '@angular/core';
import { TicketManagerService } from '../../shared/services/ticket-manager.service';
import { TicketInterface } from '../../shared/interfaces/ticket.interface';

@Component({
  selector: 'app-ticket-uploader',
  standalone: true,
  imports: [],
  templateUrl: './ticket-uploader.component.html',
  styleUrl: './ticket-uploader.component.scss'
})
export class TicketUploaderComponent {
  public tickets: TicketInterface[] = [];

  constructor(private ticketManagerService: TicketManagerService) {
  }

  public async onChangeFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    this.tickets = [];

    const tickets: TicketInterface[] = [];

    for (let index = 0; index < input.files.length; index++) {
      const file = input.files[index];
      const arrayBuffer: ArrayBuffer = await file.arrayBuffer();
      tickets.push(await this.ticketManagerService.extractTicketFromPdf(arrayBuffer));
    }

    this.tickets = [...tickets];
  }

}
