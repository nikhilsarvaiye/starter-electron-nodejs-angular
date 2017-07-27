import { IMessageReply } from './../message-reply.interface';
import { IMessage } from "../../../../models";

export class TextMessageReply implements IMessageReply {
    
    public createMessageReply(message: IMessage, callback: (message: IMessage) => void): void {
        // return will callback so that message service can emit the message
        callback(message);
    }
}   