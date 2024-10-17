/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { attr, observable } from "@microsoft/fast-element";
import { ARIAGlobalStatesAndProperties, StartEnd } from "../patterns/index";
import type { StartEndOptions } from "../patterns/index";
import { applyMixins } from "../utilities/apply-mixins";
import type { FoundationElementDefinition } from "../foundation-element/foundation-element";
import { FormAssociatedButton } from "./button.form-associated";

/**
 * Button configuration options
 * @public
 */
export type ButtonOptions = FoundationElementDefinition & StartEndOptions;

/**
 * A Button Custom HTML Element.
 * Based largely on the {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element }.
 *
 * @slot start - Content which can be provided before the button content
 * @slot end - Content which can be provided after the button content
 * @slot - The default slot for button content
 * @csspart control - The button element
 * @csspart content - The element wrapping button content
 *
 * @public
 */
export class Button extends FormAssociatedButton {
    /**
     * Determines if the element should receive document focus on page load.
     *
     * @public
     * @remarks
     * HTML Attribute: autofocus
     */
    @attr({ mode: "boolean" })
    // @ts-expect-error Type is incorrectly non-optional
    public autofocus: boolean;

    /**
     * The id of a form to associate the element to.
     *
     * @public
     * @remarks
     * HTML Attribute: form
     */
    @attr({ attribute: "form" })
    // @ts-expect-error Type is incorrectly non-optional
    public formId: string;

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formaction
     */
    @attr
    // @ts-expect-error Type is incorrectly non-optional
    public formaction: string;
    // @ts-expect-error Type is incorrectly non-optional
    private formactionChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formAction = this.formaction;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formenctype
     */
    @attr
    // @ts-expect-error Type is incorrectly non-optional
    public formenctype: string;
    // @ts-expect-error Type is incorrectly non-optional
    private formenctypeChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formEnctype = this.formenctype;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formmethod
     */
    @attr
    // @ts-expect-error Type is incorrectly non-optional
    public formmethod: string;
    // @ts-expect-error Type is incorrectly non-optional
    private formmethodChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formMethod = this.formmethod;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formnovalidate
     */
    @attr({ mode: "boolean" })
    // @ts-expect-error Type is incorrectly non-optional
    public formnovalidate: boolean;
    // @ts-expect-error Type is incorrectly non-optional
    private formnovalidateChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formNoValidate = this.formnovalidate;
        }
    }

    /**
     * See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button | <button> element} for more details.
     *
     * @public
     * @remarks
     * HTML Attribute: formtarget
     */
    @attr
    // @ts-expect-error Type is incorrectly non-optional
    public formtarget: "_self" | "_blank" | "_parent" | "_top";
    // @ts-expect-error Type is incorrectly non-optional
    private formtargetChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.formTarget = this.formtarget;
        }
    }

    /**
     * The button type.
     *
     * @public
     * @remarks
     * HTML Attribute: type
     */
    @attr
    // @ts-expect-error Type is incorrectly non-optional
    public type: "submit" | "reset" | "button";
    // @ts-expect-error Type is incorrectly non-optional
    private typeChanged(
        previous: "submit" | "reset" | "button" | void,
        next: "submit" | "reset" | "button"
    ): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.type = this.type;
        }

        next === "submit" && this.addEventListener("click", this.handleSubmission);
        previous === "submit" && this.removeEventListener("click", this.handleSubmission);
        next === "reset" && this.addEventListener("click", this.handleFormReset);
        previous === "reset" && this.removeEventListener("click", this.handleFormReset);
    }

    /**
     *
     * Default slotted content
     *
     * @public
     * @remarks
     */
    @observable
    // @ts-expect-error Type is incorrectly non-optional
    public defaultSlottedContent: HTMLElement[];

    /** {@inheritDoc (FormAssociated:interface).validate} */
    public override validate(): void {
        super.validate(this.control);
    }

    /**
     * @internal
     */
    public override connectedCallback(): void {
        super.connectedCallback();

        this.proxy.setAttribute("type", this.type);
        this.handleUnsupportedDelegatesFocus();

        const elements = Array.from(this.control?.children) as HTMLSpanElement[];
        if (elements) {
            elements.forEach((span: HTMLSpanElement) => {
                span.addEventListener("click", this.handleClick);
            });
        }
    }

    /**
     * @internal
     */
    public override disconnectedCallback(): void {
        super.disconnectedCallback();

        const elements = Array.from(this.control?.children) as HTMLSpanElement[];
        if (elements) {
            elements.forEach((span: HTMLSpanElement) => {
                span.removeEventListener("click", this.handleClick);
            });
        }
    }

    /**
     * Prevent events to propagate if disabled and has no slotted content wrapped in HTML elements
     * @internal
     */
    private handleClick = (e: Event) => {
        if (this.disabled && this.defaultSlottedContent?.length <= 1) {
            e.stopPropagation();
        }
    };

    /**
     * Submits the parent form
     */
    private handleSubmission = () => {
        if (!this.form) {
            return;
        }

        const attached = this.proxy.isConnected;

        if (!attached) {
            this.attachProxy();
        }

        // Browser support for requestSubmit is not comprehensive
        // so click the proxy if it isn't supported
        typeof this.form.requestSubmit === "function"
            ? this.form.requestSubmit(this.proxy)
            : this.proxy.click();

        if (!attached) {
            this.detachProxy();
        }
    };

    /**
     * Resets the parent form
     */
    private handleFormReset = () => {
        this.form?.reset();
    };

    // @ts-expect-error Type is incorrectly non-optional
    public control: HTMLButtonElement;

    /**
     * Overrides the focus call for where delegatesFocus is unsupported.
     * This check works for Chrome, Edge Chromium, FireFox, and Safari
     * Relevant PR on the Firefox browser: https://phabricator.services.mozilla.com/D123858
     */
    private handleUnsupportedDelegatesFocus = () => {
        // Check to see if delegatesFocus is supported
        if (
            window.ShadowRoot &&
            /* eslint-disable-next-line no-prototype-builtins */
            !window.ShadowRoot.prototype.hasOwnProperty("delegatesFocus") &&
            this.$fastController.definition.shadowOptions?.delegatesFocus
        ) {
            this.focus = () => {
                this.control.focus();
            };
        }
    };
}

/**
 * Includes ARIA states and properties relating to the ARIA button role
 *
 * @public
 */
export class DelegatesARIAButton {
    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-expanded
     */
    @attr({ attribute: "aria-expanded" })
    // @ts-expect-error Type is incorrectly non-optional
    public ariaExpanded: "true" | "false" | string | null;

    /**
     * See {@link https://www.w3.org/WAI/PF/aria/roles#button} for more information
     * @public
     * @remarks
     * HTML Attribute: aria-pressed
     */
    @attr({ attribute: "aria-pressed" })
    // @ts-expect-error Type is incorrectly non-optional
    public ariaPressed: "true" | "false" | "mixed" | string | null;
}

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIAButton extends ARIAGlobalStatesAndProperties {}
applyMixins(DelegatesARIAButton, ARIAGlobalStatesAndProperties);

/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface Button extends StartEnd, DelegatesARIAButton {}
applyMixins(Button, StartEnd, DelegatesARIAButton);