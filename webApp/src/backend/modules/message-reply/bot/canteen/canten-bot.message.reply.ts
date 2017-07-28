import { CanteenService } from './canteen.service';
import { IMessageReply } from './../../message-reply.interface';
import { IMessage } from "../../../../../models";

import { CanteenBotService } from './canteen.bot.service';
import { PolicyService } from './../policy/policy.service';
import { HolidayService } from './../holiday/holiday.service';

export class CanteenBotMessageReply implements IMessageReply {

    public sendResponse(type: string, message: IMessage, response: any, saveMessage: boolean, callback: (message: IMessage, saveMessage: boolean) => void, data: any = null): void {
        // prepare result
        message.message = JSON.stringify({ 
            'action': response.result.action,
            'botType': type,
            'result': data || response,
            'message': response.result.fulfillment.speech
        });

        // return will callback so that message service can emit the message
        callback(message, saveMessage);
    }

    public createMessageReply(message: IMessage, callback: (message: IMessage, saveMessage: boolean) => void): void {
        new CanteenBotService().getActions(message.message, (error: any, result: any) => {
            if (!error) {
                switch (result.result.action) {
                    case 'viewMenu':
                    case 'viewAllMenus':
                        new CanteenService().search('canteen', (error: any, data: any) => {
                            this.sendResponse('Canteen', message, result, false, callback, data);
                        });
                        break;

                    case 'holiday':
                    case 'showHolidays':
                    case 'getHolidays':
                        new HolidayService().search('holiday', (error: any, data: any) => {
                            this.sendResponse('Holiday', message, result, true, callback, data);
                        });
                        break;

                    case 'policy':
                    case 'viewPolicies':
                        new PolicyService().search('policy', (error: any, data: any) => {
                            this.sendResponse('Policy', message, result, true, callback, data);
                        });
                        break;

                    default:
                        this.sendResponse('', message, result, false, callback);
                        break;
                }
            }
        });
    }
}   