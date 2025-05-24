import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  menubar: MenuItem[] = [
    {label: 'Devices', routerLink: ''},
    {label: 'Add Device', routerLink: '/new'}
  ]
}
