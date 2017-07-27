import { Injectable } from '@angular/core';

const notifier = (<any>window).notifier;

@Injectable()
export class NotificationService {

    constructor() {
    }

    notify(message: string, title?: string, iconUrl?: string, buttons?: string[], buttonClickEvent?: any): void {
        if (notifier) {
            let notification = notifier.notify(title, {
                message: message,
                icon: iconUrl ? iconUrl : '',
                // buttons: ['Dismiss', 'Snooze'],
                buttons: buttons ? buttons : [], // ['Dismiss'],
                flat: true
            });
            if (buttonClickEvent) {
                notification.on('buttonClicked', buttonClickEvent);
                /*
                notification.on('buttonClicked', (text, buttonIndex, options) => {
                    if (text === 'Snooze') {
                        // Snooze!
                    } else if(buttonIndex === 1) {
                        //open options.url
                    }
                    notification.close()
                });
                */
            }
        }
    }
}