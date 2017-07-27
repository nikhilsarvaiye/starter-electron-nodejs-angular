import { IRoom } from '../../../../models';

export interface IChat extends IRoom {
    _id: string;
    chatName: string;
    isChannel: boolean;
    pic: string;
    isOnline: boolean;
    showChatBox: boolean;
}