import { css } from '@microsoft/fast-element';

export const styles = css`
    :host {
        display: inline-block;
        width: 1em;
        height: 1em;
        contain: strict;
    }

    .control{
        display: block;
        height: 100%;
        width: 100%;
        margin: 0;
    }
`;
