import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TaskModel } from '@tasker/shared';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-board-view',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCardFooter,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './board-view.html',
  styleUrl: './board-view.css',
})
export class BoardView {
  tasks = input<TaskModel[]>();
}
