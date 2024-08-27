import { ItemInterface } from './item.interface';

export interface TicketInterface {
  date: Date;
  items: ItemInterface[];
}