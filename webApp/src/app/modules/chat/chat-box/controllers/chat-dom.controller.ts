import * as $ from 'jquery';

export class ChatDomController {

    static applyEmoji(element: any, keyPress?: any) {
        if (($(element).emojioneArea)) {
            $(element).emojioneArea({
                events: {
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    focus: function (editor, event) {
                        // console.log('event:focus');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    blur: function (editor, event) {
                        // console.log('event:blur');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    mousedown: function (editor, event) {
                        // console.log('event:mousedown');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    mouseup: function (editor, event) {
                        // console.log('event:mouseup');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    click: function (editor, event) {
                        // console.log('event:click');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    keyup: function (editor, event) {
                        // console.log('event:keyup');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    keydown: function (editor, event) {
                        // console.log('event:keydown');
                        
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    keypress: function (editor, event) {
                        // console.log('event:keypress');
                        
                        if (keyPress) {
                            keyPress(event);
                        }
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    paste: function (editor, event) {
                        // console.log('event:paste');
                    },
                    /**
                     * @param {jQuery} editor EmojioneArea input
                     * @param {Event} event jQuery Event object
                     */
                    change: function (editor, event) {
                        ;
                        console.log('event:change');
                    },
                    /**
                     * @param {jQuery} filter EmojioneArea filter
                     * @param {Event} event jQuery Event object
                     */
                    filter_click: function (filter, event) {
                        console.log('event:filter.click, filter=' + filter.data("filter"));
                    },
                    /**
                     * @param {jQuery} button EmojioneArea emoji button
                     * @param {Event} event jQuery Event object
                     */
                    emojibtn_click: function (button, event) {
                        console.log('event:emojibtn.click, emoji=' + button.children().data("name"));
                    },
                    /**
                     * @param {jQuery} button EmojioneArea left arrow button
                     * @param {Event} event jQuery Event object
                     */
                    arrowLeft_click: function (button, event) {
                        console.log('event:arrowLeft.click');
                    },
                    /**
                     * @param {jQuery} button EmojioneArea right arrow button
                     * @param {Event} event jQuery Event object
                     */
                    arrowRight_click: function (button, event) {
                        console.log('event:arrowRight.click');
                    }
                }
            });
        }
    }

    static applyFaceMocion(element: any) {
        if (($(element).faceMocion)) {
            $(element).faceMocion();
        }
    }
}