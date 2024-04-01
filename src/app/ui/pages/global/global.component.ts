import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../../shared/nav/nav.component';
@Component({
  selector: 'app-global',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './global.component.html',
  styleUrl: './global.component.css'
})
export class GlobalComponent {

}
