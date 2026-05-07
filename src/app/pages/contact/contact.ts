import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  city = new FormControl('');
  country = new FormControl('');
  zipcode = new FormControl('');

  showValues() {
    console.log(this.city.value);
  }
}
