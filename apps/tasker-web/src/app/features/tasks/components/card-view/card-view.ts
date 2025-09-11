import { Component, input } from '@angular/core';
import { TaskModel } from '@tasker/shared';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-card-view',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatCardFooter,
    MatIcon,
    MatIconButton,
    MatCardActions,
  ],
  templateUrl: './card-view.html',
  styleUrl: './card-view.css',
})
export class CardView {
  tasks = input<TaskModel[]>();
}
