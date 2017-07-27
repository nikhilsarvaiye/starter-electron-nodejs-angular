import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import { IMailTransporter } from './interface/mail.transport'
import { EmailConfig } from './../../../../config'

export class SmtpTransport implements IMailTransporter {
    public from;
    public transport;

    constructor() {
        this.from = EmailConfig.SmptOptions.from;
        this.transport = nodemailer.createTransport(smtpTransport({
            host: EmailConfig.SmptOptions.host, // hostname
            secure: EmailConfig.SmptOptions.secure, // use SSL
            port: EmailConfig.SmptOptions.port, // port for secure SMTP
            auth: {
                user: EmailConfig.SmptOptions.username,
                pass: EmailConfig.SmptOptions.password
            }
        }));
    }
}
