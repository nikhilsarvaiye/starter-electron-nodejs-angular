import { IRoom } from './../../../../../models';
import { MessageTypes } from './../../../../../models/message-types.const';

export class MessageTypeHelper {

    public static getMessageTypeByRoom(room: IRoom) {
        if (room.name == 'CanteenBot') {
            return MessageTypes.CanteenBot;
        }
        return MessageTypes.Text;
    }
}