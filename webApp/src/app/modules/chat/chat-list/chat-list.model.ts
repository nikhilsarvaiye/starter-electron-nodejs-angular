import { IUserModel } from '../../../../backend/modules/user/models/user.model';
import { IRoom } from '../../../../models';

export interface IChat extends IRoom {
    _id: string;
    user: IUserModel;
    chatName: string;
    isChannel: boolean;
    pic: string;
    isOnline: boolean;
    showChatBox: boolean;
}