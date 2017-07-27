import * as nodemailer from 'nodemailer';
import { IMailTransporter } from './interface/mail.transport'
import { EmailConfig } from './../../../../config'

export class GmailTransport implements IMailTransporter {
    public from;
    public transport;

    constructor() {
        this.from = EmailConfig.GmailOptions.from;
        this.transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EmailConfig.GmailOptions.username,
                pass: EmailConfig.GmailOptions.password
            }
        });
    }
}