import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { MainActions } from './state';
import { Tasks } from '../features/tasks/tasks';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tasks, MatIcon, MatIconButton],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main implements OnInit {
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(new MainActions.OnMainNavigated());
  }
}
