import { Routes } from '@angular/router';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceFormComponent } from './components/device-form/device-form.component';

export const routes: Routes = [
    { path: '', component: DevicesComponent},
    { path: 'new', component: DeviceFormComponent}
];
