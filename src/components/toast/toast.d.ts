declare const CornHTMLElement: {
    new (): {};
};
export declare class CornToast extends CornHTMLElement {
    _duration: number;
    _count: any;
    _toastQueue: any;
    _toastList: any;
    constructor();
    /**
     * Attributes:
     * - delay: duration in ms before the toast disappears (default: 5000)
     * - count: maximum number of toasts to show at once (default: 5)
     */
    static get observedAttributes(): string[];
    /**
     *  Handle changes to observed attributes and update internal state accordingly.
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     */
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    /**
     * Lifecycle method called when the element is added to the DOM. Initializes internal state, creates necessary child elements, and sets up event listeners.
     * - Initializes _count and _duration from attributes or defaults.
     * - Creates a <ul> for the toast list.
     * - Caches references to these elements for later use.
     */
    connectedCallback(): void;
    addToast(message: any): void;
    _removeToast(toastListItem: any): void;
    /**
     * Adds an optional icon element to the toast item container.
     * Normalizes the icon input (DOM element or string markup) and appends it to the toast item under a span with the corn-toast--status class.
     *
     * @param {*} toastItem
     * @param {*} icon
     * @returns
     */
    _addIcon(toastItem: any, icon: any): void;
    /**
     *  Normalization strategy:
     * 1. If it's already a DOM element (SVG, img, span, etc.), clone it and sanitize it.
     * 2. If it's a string, parse it into a DOM element and sanitize it.
     * 3. If it's neither, return null.
     *
     * @param {*} icon
     * @returns
     */
    _normalizeIcon(icon: any): any;
    _sanitizeIcon(el: any, isRoot?: boolean): any;
    _createElements(): void;
    _cacheElements(): void;
}
export {};
