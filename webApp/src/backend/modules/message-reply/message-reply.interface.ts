import { IMessage } from "../../../models";

export interface IMessageReply {
    createMessageReply(message: IMessage, callback: (message: IMessage, saveMessage: boolean) => void): void;
}