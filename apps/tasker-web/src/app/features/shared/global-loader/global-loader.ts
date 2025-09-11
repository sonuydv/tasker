import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template:`<div class="loader"></div>`,
  styleUrl: './global-loader.css'
})
export class GlobalLoader {}
