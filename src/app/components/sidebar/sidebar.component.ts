/* Angular */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Transloco */
import { TranslocoModule,  } from "@jsverse/transloco";

/* PrimeNg */
import { PrimeNGModule } from '../../shared/modules/primeng.module';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    TranslocoModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

}
