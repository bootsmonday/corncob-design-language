declare const CornHTMLElement: {
    new (): {};
};
/**
 * CornSelect is a custom HTML element that represents a select dropdown component with support for multiple selections.
 * It extends the HTMLElement class and implements the FormAssociated interface, allowing it to be used in forms and participate in form submission.
 * The component uses a popover to display the list of options, and it supports keyboard navigation and accessibility features.
 * It also observes changes to its light DOM children (option elements) and updates its internal state accordingly.
 * The component can be configured with attributes such as 'multiple', 'required', and 'disabled' to control its behavior.
 * The CornSelect component is designed to be used in web applications where a custom select dropdown is needed, providing a more flexible and customizable alternative to the native HTML select element.
 * It is part of the Corncob Design Language, which provides a set of reusable UI components for building web applications.
 *
 * @class CornSelect
 * @extends HTMLElement
 * @implements FormAssociated
 * @example
 * <corn-select name="my-select" multiple required>
 *   <option value="option1">Option 1</option>
 *   <option value="option2">Option 2</option>
 *   <option value="option3">Option 3</option>
 * </corn-select>
 */
export declare class CornSelect extends CornHTMLElement implements FormAssociated {
    #private;
    uuid: string;
    id: string;
    _displayValue: HTMLDivElement;
    _popover: HTMLElement;
    static formAssociated: boolean;
    _generateUuid(): string;
    /**
     * constructor initializes the CornSelect component, setting up its internal state and internals. Host attributes are applied in connectedCallback to keep construction compliant with custom element requirements.
     */
    constructor();
    /**
     * connectedCallback is a lifecycle method that is called when the element is added to the DOM. In this method, we call the render method to set up the initial structure of the component, and we create a MutationObserver to watch for changes in the light DOM children (option elements). When changes are detected, we re-render the component to reflect the updated options. We also set up event listeners for user interactions with the component.
     */
    connectedCallback(): void;
    /**
     * connectObserver is a method that sets up the MutationObserver to observe changes in the light DOM children of the CornSelect component. It configures the observer to watch for changes in child elements, attributes, and specific attribute filters (value, disabled, selected, label, multiple). When changes are detected, the observer will trigger a callback to re-render the component and update its internal state accordingly. This ensures that the component remains in sync with its light DOM children and reflects any changes made to the option elements.
     * The connectObserver method is called during the connectedCallback to ensure that the observer is set up when the component is added to the DOM.
     */
    connectObserver(): void;
    /**
     * _getSizeModifier is a method that determines the size modifier for the CornSelect component based on the class names of its parent element. It checks for specific size modifiers (--xs, --sm, --md, --lg, --xl) in the parent's class list and returns the first matching modifier. If no size modifier is found, it defaults to '--md'. This method allows the component to adapt its appearance based on the size specified by its parent element's classes.
     *
     */
    _getSizeModifier(): string;
    /**
     * _updateCheckboxes is a method that updates the state of the checkboxes in the CornSelect component when a user interacts with them. It retrieves all checkbox options and checks if the component has the 'multiple' attribute. If it does not, it ensures that only one checkbox can be selected at a time by unchecking all other checkboxes when one is checked. It then collects the values of all checked checkboxes and updates the component's value property with a comma-separated string of the selected values. This method is called whenever a checkbox is clicked, ensuring that the component's state remains consistent with user interactions.
     * @param {Event} evt - The event object representing the user interaction with a checkbox.
     */
    _updateCheckboxes(evt: Event): void;
    /**
     * _updateDisplayValue is a method that updates the display value of the CornSelect component based on the currently selected checkboxes. It retrieves all checked checkboxes, collects their values, and joins them into a comma-separated string. This string is then set as the text content of the display value element. If no checkboxes are selected, it displays a placeholder text or a default message. This method ensures that the user sees an accurate representation of their selections in the component's UI.
     * It is called whenever the selection changes, ensuring that the display value remains in sync with the user's choices.
     */
    _updateDisplayValue(): void;
    /**
     * render is a method that sets up the initial structure and content of the CornSelect component. It creates a display value element to show the selected options, initializes a popover for the list of options, and generates checkbox inputs for each option in the light DOM. The method also sets up event listeners and connects the MutationObserver to watch for changes in the light DOM. This method is called when the component is first added to the DOM and whenever changes are detected in the light DOM children (option elements). It ensures that the component's UI reflects its current state and provides an interactive experience for users.
     */
    render(): void;
    /**
     * observedAttributes is a static getter that returns an array of attribute names to monitor for changes.
     * When any of these attributes change, the attributeChangedCallback method is called.
     */
    static get observedAttributes(): string[];
    /**
     * attributeChangedCallback is called whenever one of the observed attributes changes.
     * It receives the name of the attribute, its old value, and its new value as arguments.
     * In this case, when the 'position' attribute changes, it updates the internal _position property and applies the corresponding position class.
     */
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    /**
     * handleEvent is a method that handles events for the popover component.
     * It listens for click and keydown events. When a click event occurs, it calls the _toggle method to open or close the popover.
     * When a keydown event occurs, it calls the _trapFocus method to manage keyboard navigation within the popover. This method allows the component to respond to user interactions and provides accessibility features for keyboard users.
     * By using handleEvent we no longer need to bind the context of the event handlers, as it will automatically use the instance of the class as the context when handling events. This simplifies the code and ensures that the correct context is used when responding to events.
     *
     * @param {*} evt
     */
    handleEvent(evt: any): void;
    /**
     * _addEventListeners is a method that sets up event listeners for the popover component.
     * It adds a click event listener to the trigger element (the element that will open the popover) that calls the _toggle method when clicked.
     * It also adds a keydown event listener to the popover itself that calls the trapFocus method, which is responsible for managing keyboard navigation within the popover (e.g., trapping focus inside the popover when it's open).
     * Additionally, it defines a clickListener function that checks if a click event occurs outside of the popover and its trigger. If such a click is detected, it calls the _close method to close the popover.
     * This setup ensures that the popover can be opened and closed through user interactions, and that keyboard navigation is properly handled for accessibility.
     * The clickListener is added to the document when the popover is opened and removed when it's closed to manage event listeners efficiently.
     */
    _addEventListeners(): void;
    /**
     * _removeEventListeners is a method that removes the event listeners that were added in the _addEventListeners method. It removes the click event listener from the trigger element and the keydown event listener from the popover itself. It also removes the clickListener from the document to prevent it from listening for clicks when the popover is closed. This cleanup is important to avoid memory leaks and unintended behavior when the component is removed from the DOM or when it is no longer needed.
     */
    _removeEventListeners(): void;
    _getAllListOptions(): Element[];
    /**
     * _trapFocus is a method that traps the focus within the popover when it is open.
     * It listens for keydown events and handles the Tab and Shift+Tab keys to ensure that the focus cycles through the focusable elements within the popover.
     * It also listens for the Escape key to close the popover and return focus to the previously active element.
     * @param {KeyboardEvent} evt - The keyboard event object.
     * @returns {void}
     */
    _trapFocus(evt: KeyboardEvent): void;
    /**
     * The following getter methods provide access to the form-associated properties of the CornSelect component. These properties allow the component to participate in form submission and validation, making it behave like a native form control.
     */
    get form(): any;
    /**
     * The name getter returns the value of the 'name' attribute of the CornSelect component. This is important for form submission, as it determines the key under which the component's value will be submitted in the form data. If the 'name' attribute is not set, this getter will return null.
     */
    get name(): any;
    set name(value: any);
    /**
     * The type getter returns the local name of the CornSelect component, which is 'corn-select'. This is used to identify the type of the form control when it is submitted as part of a form. It can also be overridden to provide a custom type if needed.
     */
    get type(): any;
    /**
     * The following getter methods provide access to the validity state of the CornSelect component, allowing it to participate in form validation. These properties are part of the FormAssociated interface and enable the component to report its validity status, validation messages, and whether it will be validated as part of a form submission.
     */
    get validity(): any;
    /**
     * The validationMessage getter returns the validation message associated with the CornSelect component. This message is generated based on the component's validity state and can be used to provide feedback to the user when the component is invalid. If the component is valid, this getter will return an empty string.
     */
    get validationMessage(): any;
    /**
     * The willValidate getter returns a boolean indicating whether the CornSelect component will be validated when the form is submitted. This is determined by the component's attributes and validity state. If the component has the 'required' attribute or other validation constraints, this getter will return true, indicating that it will be validated as part of the form submission process.
     */
    get willValidate(): any;
    /**
     * checkValidity mirrors the native form control API so consumers can validate
     * the custom select the same way they would a standard <select> element.
     */
    checkValidity(): any;
    /**
     * reportValidity mirrors the native form control API.
     */
    reportValidity(): any;
    /**
     * The value getter and setter allow access to the current value of the CornSelect component. The getter returns the internal value, while the setter updates the internal value and sets the form value using the FormAssociated internals. It also calls the #updateValidity method to ensure that the component's validity state is updated based on the new value. This allows the component to participate in form submission and validation, ensuring that its value is correctly represented in the form data.
     */
    get value(): any[];
    /**
     * The value setter updates the internal value of the CornSelect component and sets the form value using the FormAssociated internals. It also calls the #updateValidity method to ensure that the component's validity state is updated based on the new value. This allows the component to participate in form submission and validation, ensuring that its value is correctly represented in the form data.
     */
    set value(v: any[]);
    /**
     * disconnectedCallback is a lifecycle method that is called when the element is removed from the DOM. In this method, we call _removeEventListeners to clean up any event listeners that were added when the element was connected. This is important to prevent memory leaks and ensure that the component does not continue to respond to events after it has been removed from the DOM.
     * By removing event listeners in the disconnectedCallback, we ensure that the component is properly cleaned up and does not cause unintended side effects in the application after it has been removed.
     * This is a crucial part of managing the lifecycle of custom elements and ensuring that they behave correctly in dynamic applications where elements may be added and removed frequently.
     */
    disconnectedCallback(): void;
}
export {};
