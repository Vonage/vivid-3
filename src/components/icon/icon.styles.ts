import { css } from '@microsoft/fast-element';

export const styles = css`
    :host {
        display: inline-block;
    }

    .control {
        display: flex;
        contain: strict;
        margin: unset;
    }

    svg {
        margin: auto;
    }

    /* Size */

    .control:not(.size-small):not(.size-medium):not(.size-large) {
        inline-size: 1em;
        block-size: 1em;
    }

    .control.size-small {
        inline-size: 16px;
        block-size: 16px;
    }

    .control.size-medium {
        inline-size: 24px;
        block-size: 24px;
    }

    .control.size-large {
        inline-size: 32px;
        block-size: 32px;
    }

`;
