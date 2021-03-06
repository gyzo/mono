import { mono } from '@mono/proto';
import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as process from 'process';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class ApiMailerService {
  private readonly smtpConfig: SMTPTransport.Options = {
    host: process.env.MAILER_HOST ?? '',
    port: Number(process.env.MAILER_PORT ?? 0),
    secure: true, // use SSL
    auth: {
      type: 'OAUTH2',
      user: process.env.MAILER_EMAIL ?? '',
      clientId: process.env.MAILER_CLIENT_ID ?? '',
      clientSecret: process.env.MAILER_CLIENT_SECRET ?? '',
      refreshToken: process.env.MAILER_REFRESH_TOKEN ?? '',
      accessToken: 'empty',
    },
  };

  public readonly mailTransporter = nodemailer.createTransport(this.smtpConfig);

  private saveEmailToDB(email: mono.Email, subscriber: Subscriber<mono.Result>) {
    const entry = {
      name: email.name,
      email: email.email,
      header: email.header,
      message: email.message,
      domain: email.domain,
    };

    admin
      .database()
      .ref('/emails')
      .push(entry)
      .then(() => {
        const result = mono.Result.fromObject({ messsage: 'Your message was successfully sent' });
        subscriber.next(result);
        subscriber.complete();
      })
      .catch(error => {
        const result = mono.Result.fromObject({
          messsage: `Try again later, please. Error: ${error}`,
        });
        subscriber.error(result);
        subscriber.complete();
      });
  }

  /**
   * Send email message using nodemailer
   */
  private sendEmail(email: mono.Email) {
    const mailOptions = {
      from: `"PORTFOLIO 👥" <${process.env.MAILER_EMAIL}>`,
      to: process.env.MAILER_RECIPIENT_EMAIL,
      subject: `PORTFOLIO: ${email.header} ✔`,
      text: `${email.message}\n\nMessage was sent from domain: ${email.domain}`,
      html: `<h3>${email.header}</h3>
      <p>${email.message}</p>
      <p>From: ${email.name} ${email}</p>
      <p>Message was sent from domain: ${email.domain}</p>`,
    };

    const observable = new Observable<mono.Result>(subscriber => {
      this.mailTransporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          /**
           * @note do not report error to user, save email to db instead
           */
          // res.status(500).send('Mail transporter error');
          // eslint-disable-next-line no-console -- TODO: pass to logger
          console.warn('Mail transporter error', err);
          this.saveEmailToDB(email, subscriber);
        } else {
          // eslint-disable-next-line no-console -- TODO: pass to logger
          console.log('mailTransporter, info', info);
          const result = mono.Result.fromObject({ messsage: 'Your message was successfully sent' });
          subscriber.next(result);
          subscriber.complete();
        }
      });
    });
    return observable;
  }

  public ping(): mono.Result {
    return mono.Result.fromObject({
      message: 'Mailer service is online. Public methods: mail.',
    });
  }

  public mail(email: mono.Email) {
    return this.sendEmail(email);
  }
}
