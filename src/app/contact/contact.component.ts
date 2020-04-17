import { ConnectionService } from './../connection.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {

contactForm: FormGroup;
disabledSubmitButton: boolean = true;
optionsSelect: Array<any>;
value = false;

  @HostListener('input') oninput() {

  if (this.contactForm.valid) {
    this.disabledSubmitButton = false;
    }
  }

  constructor(private fb: FormBuilder, private connectionService: ConnectionService) {

  this.contactForm = fb.group({
    'contactFormFirstName': ['', Validators.required],
    'contactFormLastName': ['', Validators.required],
    'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
    'contactFormMessage': ['', Validators.required],
    'contactFormBeRecalled': [false],
    'contactFormPhoneNumber': ['']
    });
  }

  ngOnInit() {
    document.getElementById('contactFormPhoneNumber').style.display = "none";
  }

  onSubmit() {
    this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
      alert('Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais.');
      this.contactForm.reset();
      this.disabledSubmitButton = true;
    }, error => {
      console.log('Error', error);
    });
  }

  beRecalled() {
    this.value = !this.value;
    document.getElementById('contactFormPhoneNumber').style.display = (!this.value ? "none" : "inline");
  }
}