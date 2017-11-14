import * as fs from 'fs';
import * as path from 'path';
import { SendMailOptions, SentMessageInfo } from 'nodemailer';
import * as emailTemplates from 'email-templates';
import { EmailServices, EmailConfig } from './../../../config'
import { IMailTransporter } from './transports/interface/mail.transport'
import { GmailTransport } from './transports/gmail.transport'
import { SmtpTransport } from './transports/smtp.transport'
import { Logger } from './../logger/logger';

const EmailTemplate = emailTemplates.EmailTemplate;

export class Mail {

    public from: string = "";

    // send mail with templateDir and data
    public sendOneWithTemplate(mailOptions: SendMailOptions, templateDir: string, data: Object, callback?: (error: Error, info: SentMessageInfo) => void) {
        try {
            let $this = this;
            let defaultMailOptions = this.getDefaultMailOptions();
            mailOptions = Object.assign(defaultMailOptions, mailOptions);
            this.getTemplate(templateDir, data, function (err: Error, result: EmailTemplateResults): void {
                if (err) {
                    Logger.error(err.stack);
                    Logger.handleExceptions(<any>err);
                    if (callback)
                        callback(err, null);
                } else {
                    mailOptions.html = result.html;
                    mailOptions.subject = result.subject;
                    mailOptions.text = result.text;
                    $this.sendOne(mailOptions, callback);
                }
            });
        } catch (e) {
            Logger.handleExceptions(e);
        }
    }

    // send mail with mailOptions
    public sendOne(mailOptions: SendMailOptions, callback: (error: Error, info: SentMessageInfo) => void) {
        try {
            let mailTransporter = this.getTransporter();
            mailOptions.from = mailTransporter.from || mailOptions.from;
            mailOptions.from = this.from || mailOptions.from;
            mailTransporter.transport.sendMail(mailOptions, function (err: Error, info: SentMessageInfo) {
                if (err) {
                    Logger.error(err.stack);
                    Logger.handleExceptions(<any>err);
                    if (callback)
                        callback(err, null);
                } else {
                    Logger.info('email sent ', info);
                    if (callback)
                        callback(null, info);
                }
            });
        } catch (e) {
            Logger.handleExceptions(e);
        }
    }

    public getTemplate(templateDir: string, data: Object, callback: (err: Error, result: EmailTemplateResults) => void) {
        var template = new EmailTemplate(templateDir);
        template.render(data, function (err: Error, result: EmailTemplateResults): void {
            if (err) {
                Logger.error(err.stack);
                Logger.handleExceptions(<any>err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // public getTemplates(templateDir: string, data: Object[]) {
    //     var template = new EmailTemplate(templateDir);
    //     var templates = data.map(function (user) {
    //         return template.render(data)
    //     });
    //     return Promise.all(templates);
    // }


    private getTransporter(): IMailTransporter {
        if (EmailConfig.defaultService == EmailServices.GMAIL)
            return new GmailTransport();
        else if (EmailConfig.defaultService == EmailServices.SMTP)
            return new SmtpTransport();
        else throw new Error("No Email Transport Defined");
    }

    private getDefaultMailOptions(): SendMailOptions {
        let defaultMailOptions = EmailConfig.EmailOptions;
        return <SendMailOptions>defaultMailOptions;
    }
}

export { SendMailOptions as MailOptions }



