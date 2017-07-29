import { IMessage } from "../../../models";
import { MessageTypes } from './../../../models/message-types.const';

// replies
import { TextMessageReply } from './text/text.message.reply';
import { CanteenBotMessageReply } from './bot/canteen/canten-bot.message.reply';

export class MessageReplyHelper {

    static isBot(message: IMessage): boolean {
        console.log("Checking if it is bot reply if message type ", message.type);
        switch(message.type) {
            case MessageTypes.CanteenBot: { return true; }; 
        }
        return false;
    }
    
    static getMessageReply(message: IMessage, callback: (message: IMessage) => void): void {
        console.log("creating message reply for message type ", message.type);
        if (message.type == MessageTypes.CanteenBot) {
            message.from = MessageTypes.CanteenBot;
            return new CanteenBotMessageReply().createMessageReply(message, callback);
        }
        // return default where nothing needs to be done
        return new TextMessageReply().createMessageReply(message, callback);
    }
}