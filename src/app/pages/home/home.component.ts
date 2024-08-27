/* Angular */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Transloco */
import { TranslocoModule,  } from "@jsverse/transloco";

/* PrimeNg */
import { PrimeNGModule } from '../../shared/modules/primeng.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PrimeNGModule,
    TranslocoModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
