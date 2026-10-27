declare const CornHTMLElement: {
    new (): {};
};
export declare class CornButtonBar extends CornHTMLElement {
    initialized: boolean;
    _internals: any;
    _overflowLabel: string;
    resizeObserver: ResizeObserver;
    moreElement: any;
    moreItems: any;
    moreButton: any;
    /**
     * The constructor method is called when a new instance of the CornButtonBar component is created.
     * In this method, we call the super() method to ensure that the HTMLElement constructor is properly initialized.
     */
    constructor();
    /**
     * connectedCallback is a lifecycle method that is called when the element is added to the DOM.
     * In this method, we call _cacheElements to store references to important child elements and _addEventListeners to set up any necessary event listeners for the component.
     * This ensures that the component is fully initialized and ready to respond to user interactions as soon as it is connected to the DOM.
     */
    connectedCallback(): void;
    /**
     * observedAttributes is a static getter that returns an array of attribute names that the component wants to observe for changes. In this case, we are observing the 'overflow-label' attribute, which allows users to customize the label of the overflow menu trigger button.
     * When this attribute changes, the attributeChangedCallback method will be called, allowing us to update the component's behavior or appearance based on the new value of the attribute. This is a key part of making the component flexible and customizable for different use cases.
     * @returns {string[]} An array of attribute names to observe for changes.
     */
    static get observedAttributes(): string[];
    /**
     * attributeChangedCallback is a lifecycle method that is called when one of the observed attributes changes.
     * In this case, it updates the _overflowLabel property when the 'overflow-label' attribute changes.
     * @param {string} name - The name of the attribute that changed.
     * @param {string} oldValue - The previous value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void;
    /**
     * _addEventListeners is a method that sets up event listeners for the component. In this case, it uses a ResizeObserver to monitor changes in the size of the button bar. When the size changes, it calls the _moveOverflowingItems method to adjust which items are visible in the button bar and which are moved to an overflow menu (if applicable). This allows the button bar to dynamically adapt to different screen sizes and ensure that all buttons remain accessible even when there isn't enough space to display them all in a single row.
     */
    _addEventListeners(): void;
    /**
     * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method.
     * It removes the click event listener from the trigger element and the keydown event listener from the popover itself.
     * It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed.
     * This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
     */
    _removeEventListeners(): void;
    /**
     * This creates the overflow container for the button bar, which includes a trigger button and a popover for the overflow items. The trigger button is assigned an aria-controls attribute that references the ID of the popover, allowing assistive technologies to understand the relationship between the button and the popover. If a custom "more" button is not provided in the named slot, a default button is created with the label specified by the _overflowLabel property (or "More" if not set). The popover is positioned at the bottom of the trigger button and is initially empty, ready to be populated with overflowing items as needed. This method ensures that the overflow functionality is properly set up and accessible to all users.
     * @returns {HTMLElement} The created overflow container element.
     */
    _createOverflowContainer(): HTMLElement;
    /**
     * _cacheElements is a method that caches references to important child elements within the button bar.
     * In this case, it looks for an element with the class 'corn-button-bar--more' which is likely a button that triggers an overflow menu, and then it looks for a 'corn-popover' element within that button which would contain the overflow items.
     * Caching these elements allows the component to efficiently access and manipulate them later when handling events or updating the UI, without needing to repeatedly query the DOM.
     */
    _cacheElements(): void;
    /**
     * _hasOverflow is a method that checks if there are any overflowing items in the button bar.
     * It temporarily moves all items from the overflow menu back to the main button bar to accurately measure their positions.
     * It then checks if any items have wrapped to a new line, indicating that they are overflowing.
     * @returns {boolean} True if there are overflowing items, false otherwise.
     */
    _hasOverflow(): boolean;
    /**
     * _moveOverflowingItems is a method that moves the identified overflowing items from the main button bar into the overflow menu (moreItems).
     * It first calls _hasOverflow to check if there are any overflowing items, and if so, it moves them to the moreItems container.
     * This allows the button bar to maintain a clean layout while still providing access to all buttons through the overflow menu when there isn't enough space to display them all in a single row.
     * @returns {void}
     */
    _moveOverflowingItems(): void;
    /**
     * disconnectedCallback is a lifecycle method that is called when the element is removed from the DOM. In this method, we call _removeEventListeners to clean up any event listeners that were added when the element was connected. This is important to prevent memory leaks and ensure that the component does not continue to respond to events after it has been removed from the DOM.
     * By removing event listeners in the disconnectedCallback, we ensure that the component is properly cleaned up and does not cause unintended side effects in the application after it has been removed.
     * This is a crucial part of managing the lifecycle of custom elements and ensuring that they behave correctly in dynamic applications where elements may be added and removed frequently.
     */
    disconnectedCallback(): void;
}
export {};
