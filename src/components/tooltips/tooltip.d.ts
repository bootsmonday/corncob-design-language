declare const CornHTMLElement: {
    new (): {};
};
export declare class CornTooltip extends CornHTMLElement {
    _position: any;
    parent: any;
    classPrefix: string;
    id: string;
    _showTooltip: () => void;
    _hideTooltip: () => void;
    scrollEl: any;
    observerOptions: {
        root: HTMLElement;
        rootMargin: string;
        threshold: number;
    };
    overlapClass: string;
    resizeObserver: ResizeObserver;
    static get observedAttributes(): string[];
    /**
     * observedAttributes is a static getter that returns an array of attribute names to monitor for changes.
     * When any of these attributes change, the attributeChangedCallback method is called.
     */
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    connectedCallback(): void;
    _addAccessibility(): void;
    handleEvent(evt: any): void;
    _addEventListeners(): void;
    _removeEventListeners(): void;
    _toggle(isActive: any): void;
    _getScrollParent(node: any): any;
    _cacheElements(): void;
    _resizeObserverCallback(entries: any): void;
    _positionContent(): void;
    _open(): void;
    _close(): void;
    /**
     * TODO need to check if we added the ID or if it was generated, if it was generated we can remove it, but if it was added by the user we should probably leave it
     */
    disconnectedCallback(): void;
}
export {};
