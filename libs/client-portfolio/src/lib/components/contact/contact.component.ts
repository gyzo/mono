import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IContactForm } from '@mono/client-interfaces';
import { AppEmailService } from '@mono/client-store';
import { tap } from 'rxjs/operators';

/**
 * Application contact component.
 */
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPortfolioContactComponent {
  /**
   * Text input error message.
   */
  public readonly inputError = 'Invalid input, allowed characters: a-z A-Z а-я А-Я - . spacebar';

  /**
   * Common text validator.
   */
  private readonly textValidator: ValidatorFn = Validators.pattern(/[a-zA-Zа-яА-Я\s-.]{3,}/);

  public readonly contactForm: IContactForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, this.textValidator])],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    header: ['', Validators.compose([Validators.required, this.textValidator])],
    message: ['', Validators.compose([Validators.required, this.textValidator])],
    domain: [this.data.domain, Validators.compose([Validators.required])],
  }) as IContactForm;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { domain: string }, // TODO
    private readonly dialogRef: MatDialogRef<AppPortfolioContactComponent>,
    private readonly fb: FormBuilder,
    private readonly sendEmailService: AppEmailService,
  ) {}

  /**
   * Submits contact form.
   */
  public submitForm(): void {
    if (this.contactForm.valid && !this.contactForm.pristine) {
      void this.sendMessage().subscribe();
    }
  }

  /**
   * Sends message.
   */
  public sendMessage() {
    const formData = this.contactForm.value;
    return this.sendEmailService.sendEmail(formData).pipe(
      tap(() => {
        this.closeDialog();
      }),
    );
  }

  /**
   * Closes dialog.
   * Report result if it was commonly closed, or modified and closed, deleted,
   * or optionally use result provided via param.
   * Parent controller should listen to this event
   */
  public closeDialog() {
    this.dialogRef.close('closed');
  }
}
