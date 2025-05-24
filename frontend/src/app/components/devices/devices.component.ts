import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button'


@Component({
  selector: 'app-devices',
  imports: [ButtonModule],
  templateUrl: './devices.component.html',
  styleUrl: './devices.component.scss',
})
export class DevicesComponent {
  
  logClick() {
    alert("You've clicked the button!");
  }
}
