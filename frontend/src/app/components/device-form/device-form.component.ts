import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DeviceService } from '../../services/device.service';
import { ButtonModule } from 'primeng/button'
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DeviceInput } from '../../models/device-input.model';

@Component({
  selector: 'app-device-form',
  imports: [ReactiveFormsModule, ButtonModule, IftaLabelModule, InputTextModule, FloatLabelModule],
  templateUrl: './device-form.component.html',
  styleUrl: './device-form.component.scss'
})
export class DeviceFormComponent {
  deviceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService
  ) {
    this.deviceForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', Validators.required],
      ip: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('submit')
    if (this.deviceForm.valid) {
      const formData = this.deviceForm.value;
      console.log(formData);
      this.deviceService.postDevice(formData as DeviceInput).subscribe({
        next: (data) => {
          console.log('Added new device: ', data);
          this.deviceService.addDevice(data);
          this.deviceForm.reset();
        }
      })
    }
  }
}
