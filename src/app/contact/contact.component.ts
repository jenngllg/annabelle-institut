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
consent: boolean = false;
nameRegex = "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$";
phoneRegex = "^0[1-6]{1}(([0-9]{2}){4})|((\s[0-9]{2}){4})|((-[0-9]{2}){4})$";

  @HostListener('input') oninput() {

  if (this.contactForm.valid && this.consent) {
    this.disabledSubmitButton = false;
    }
    else {
      this.disabledSubmitButton = true;

    }
  }

  constructor(private fb: FormBuilder, private connectionService: ConnectionService) {

  this.contactForm = fb.group({
    'contactFormFirstName': ['',  Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(this.nameRegex)])],
    'contactFormLastName': ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern(this.nameRegex)])], 
    'contactFormEmail': ['', Validators.compose([Validators.required, Validators.email])],
    'contactFormMessage': ['', Validators.compose([Validators.required, Validators.maxLength(500)])],
    'contactFormConsent': [false],
    'contactFormPhoneNumber': ['']
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.connectionService.sendMessage(this.contactForm.value).subscribe(() => {
    alert('Votre message a bien été envoyé, nous vous répondrons dans les plus brefs délais.');
    this.contactForm.reset();
    this.consent = false;
    this.disabledSubmitButton = true;
  }, error => {
    console.log('Error', error);
  });
}

  updateConsent() {
    this.consent = !this.consent;
  }
}