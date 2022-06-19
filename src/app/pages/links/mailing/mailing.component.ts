import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiControllerService } from 'src/app/common/api-controller.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrls: ['./mailing.component.scss']
})
export class MailingComponent implements OnInit {

  public emailFormControl = new UntypedFormControl('', [
    Validators.required,
    Validators.email,
  ]);

  public bodyFormControl = new UntypedFormControl('', [
    Validators.required,
  ])

  public subjectFormControl = new UntypedFormControl('', [
    Validators.required,
  ])

  public matcher = new MyErrorStateMatcher();

  public get formsFilled(): boolean {
    return this.emailFormControl.hasError('email') || this.emailFormControl.hasError('required') || this.bodyFormControl.hasError('required') || this.subjectFormControl.hasError('required');
  }

  constructor(
    private _apiService: ApiControllerService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  public async getContent() {
    let body = (<HTMLInputElement>document.getElementById("email-address-area"))?.value.trim() + "\n-\n";
    body += (<HTMLTextAreaElement>document.getElementById('email-text-area'))?.value.trim();
    const subj = (<HTMLInputElement>document.getElementById('email-subject-area'))?.value.trim();
    
    this._snackBar.open("Sending message...", "Dismiss");
    const mail = await this._apiService.sendEmail(subj, body)
    if(mail === 'OK' ){
      this._snackBar.open("Sent message sucessfully", 'Dismiss', {
        duration: 5000,
      })
    }else{
      this._snackBar.open("Failed to send message", 'Dismiss', {
        duration: 5000,
      })
    }
  }

}
