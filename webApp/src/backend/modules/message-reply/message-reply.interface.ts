import { IMessage } from "../../../models";

export interface IMessageReply {
    createMessageReply(message: IMessage, callback: (message: IMessage) => void): void;
}