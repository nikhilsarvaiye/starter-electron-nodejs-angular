
interface MailTransporter {
    from: string;
    transport;
}

export { MailTransporter as IMailTransporter }