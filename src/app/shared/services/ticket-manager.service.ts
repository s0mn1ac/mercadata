import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocumentProxy, TextContent, TextItem } from 'pdfjs-dist/types/src/display/api';
import { PDFPageProxy } from 'pdfjs-dist/types/web/interfaces';
import { ItemInterface } from '../../shared/interfaces/item.interface';
import { TicketInterface } from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root'
})
export class TicketManagerService {

  constructor() {
    pdfjs.GlobalWorkerOptions.workerSrc = '/assets/pdf/pdf.worker.mjs';
  }

  public async extractTicketFromPdf(arrayBuffer: ArrayBuffer): Promise<TicketInterface> {
    const rawText: string[] = await this.extractTextFromPdf(arrayBuffer);
    return this.buildTicket(rawText);
  }

  private async extractTextFromPdf(arrayBuffer: ArrayBuffer): Promise<string[]> {
    const pdfDocumentProxy: PDFDocumentProxy = await pdfjs.getDocument(arrayBuffer).promise;
    const pdfPageProxy: PDFPageProxy = await pdfDocumentProxy.getPage(1);
    const textContent: TextContent = await pdfPageProxy.getTextContent();
    return (textContent.items as TextItem[]).map((item: TextItem) => (item).str?.toLowerCase());
  }

  private buildTicket(rawText: string[]): TicketInterface {
    return {
      date: this.buildDate(rawText),
      items: this.buildItems(rawText)
    };
  }

  private buildDate(rawText: string[]): Date {
    const filteredText: string = rawText.filter((item: string) => !!item && item !== ' ').join('')

    const match: RegExpMatchArray | null = filteredText.match(/(\d{2}\/\d{2}\/\d{4} \d{2}:\d{2})/);
    
    if (!match) {
      return new Date();
    }

    const dateAsString: string = match[0];

    const [date, hour] = dateAsString.split(' ');
    const [day, month, year]: string[] = date.split('/');
    const dateFormattedAsString: string = `${year}-${month}-${day}`;

    return new Date(`${dateFormattedAsString}T${hour}:00`);
  }

  private buildItems(rawText: string[]): ItemInterface[] {
    const filteredText: string = rawText.filter((item: string) => !!item && item !== ' ')
      .join(';')
      .split('importe;')[1].split('total')[0];

    const items: ItemInterface[] = [];

    const rawItems: string[] = filteredText.split(';').filter((rawItem: string) => !!rawItem);

    rawItems.forEach((rawItem: string, index: number) => {
      if (index % 2 !== 0) {
        return;
      }
      const quantityAndName = rawItem.split(/(\d+)/).filter(Boolean);
      items.push({
        quantity: parseInt(quantityAndName[0]),
        name: quantityAndName[1].trim(),
        price: parseFloat(rawItems[index + 1].replace(',', '.'))
      });
    });

    return items;
  }
}
