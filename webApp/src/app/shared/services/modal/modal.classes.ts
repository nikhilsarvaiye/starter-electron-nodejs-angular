import { HandleError } from './../../../core/error/error.handler';

export class ModalSize {
    public static Mini: string = 'modal-xs';
    public static Small: string = 'modal-sm';
    public static Default: string = '';
    public static Large: string = 'modal-lg';
    public static Full: string = 'modal-full';
}

export class ModalClassHelper {
    /**
     */
    public static getBackgroundClass(colorCode: string): string {
        return 'bg-' + colorCode;
    }
    /**
     */
    public static getButtonClass(colorCode: string): string {
        return 'btn-' + colorCode;
    }
}

export class ModalColorCode {
    public static Default: string = 'default';
    public static Primary: string = 'primary';
    public static Danger: string = 'danger';
    public static Success: string = 'success';
    public static Warning: string = 'warning';
    public static Info: string = 'info';
}

export class ModalButton {
    /**
     * Button text
     */
    public type: string;
    /**
     * Button text
     */
    public text: string;
    /**
     * Href
     */
    public href: string;
    /**
     * Button classes, use class ModalColorCode properties for color
     */
    public classes: string;

    public onClick: any;

    constructor(text: string, onClick: any, classes?: string, href?: string){
        this.text = text;
        this.onClick = onClick;
        this.classes = classes || ModalClassHelper.getButtonClass(ModalColorCode.Default);
        this.href = href;
        this.type = this.href ? "anchor" : "button";
    }
}

export class ModalOptions {
    public animate: boolean;
    /**
     *  Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
     */
    public backdrop?: boolean | 'static';
    /**
     * Closes the modal when escape key is pressed.
     */
    public keyboard?: boolean;
    public focus?: boolean;
    /**
     * Shows the modal when initialized.
     */
    public show?: boolean;
    /**
     * Ignore the backdrop click
     */
    public ignoreBackdropClick?: boolean;
    /**
     * Modal Dialog Size, use class ModalSize properties
     */
    public size: string;
    /**
     * Modal Dialog header classes, use class ModalColorCode properties for color
     */
    public headerClasses: string;

    constructor() {
        // set defaults
        this.animate = true;
        this.backdrop = true;
        this.keyboard = true;
        this.focus = true;
        this.show = true;
        this.ignoreBackdropClick = true;
        this.size = ModalSize.Default;
        this.headerClasses = ModalClassHelper.getBackgroundClass(ModalColorCode.Primary);
    }
}

export class ModalBody {
    /**
     * Body heading
     */
    public heading: string;
    /**
     * Body text content
     */
    public text: string;

    public errors: Array<HandleError>;

    constructor(text: string, heading?: string, errors?: Array<HandleError>) {
        this.heading = heading;
        this.text = text;
        this.errors = errors;
    }
}

export class Modal {
    public title: string;
    public body: ModalBody;
    public options: ModalOptions;
    public buttons: ModalButton[];

    constructor(title?: string, body?: string | ModalBody, options?: ModalOptions, buttons?: ModalButton[]) {
        this.title = title;
        if (body instanceof ModalBody)
            this.body = body;
        else
            this.body = new ModalBody(body);
        this.buttons = buttons || new Array<ModalButton>();
        this.options = new ModalOptions();
        // set defaults
        this.options = <ModalOptions>Object.assign({}, new ModalOptions(), options);
    }
}