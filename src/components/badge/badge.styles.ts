import { css } from '@microsoft/fast-element';

/**
 * Styles for badge
 * @public
 */
export const styles = css`
    .control{
        font:600 ultra-condensed 12px / 16px SpeziaWebVariable;
        letter-spacing:0px;
        text-decoration:none;
        text-transform:none;
        display:inline-flex;
        align-items: center;
        column-gap: 8px;
        vertical-align: middle;
        box-sizing:border-box;
        border:1px solid var(--layout-color-outline);
        background-color:var(--layout-color-fill);
        color:var(--layout-color-text);
    }

    .control:not(.size-small):not(.size-large) {
        block-size: 24px;
        padding-inline: 10px;
    }

    .control.size-small {
        block-size: 20px;
        padding-inline: 8px;
    }

    .control.size-large {
        block-size: 28px;
        padding-inline: 12px;
    }

    /* Layout */

    .control:not(.layout-outlined):not(.layout-soft){
        --layout-color-fill:var(--connotation);--layout-color-text:var(--on-connotation)
    }
    .control.layout-outlined{
        --layout-color-fill:transparent;--layout-color-outline:var(--connotation);--layout-color-text:var(--connotation-contrast)
    }
    .control.layout-soft{
        --layout-color-fill:var(--connotation-soft);--layout-color-text:var(--connotation-contrast)
    }

    /* Shape */

    .control:not(.shape-pill) {
        border-radius: 4px;
    }
    .control.shape-pill {
        border-radius: 14px;
    }

    /* Connotation */

    .control:not(.connotation-cta):not(.connotation-success):not(.connotation-alert):not(.connotation-warning):not(.connotation-info){
        --connotation:var(--vvd-color-primary);--on-connotation:var(--vvd-color-on-primary);--connotation-soft:var(--vvd-color-neutral-20);--connotation-contrast:var(--vvd-color-primary)
    }
    .control.connotation-cta{
        --connotation:var(--vvd-color-cta);--on-connotation:var(--vvd-color-on-cta);--connotation-soft:var(--vvd-color-cta-20);--connotation-contrast:var(--vvd-color-cta-90)
    }
    .control.connotation-success{
        --connotation:var(--vvd-color-success);--on-connotation:var(--vvd-color-on-success);--connotation-soft:var(--vvd-color-success-20);--connotation-contrast:var(--vvd-color-success-90)
    }
    .control.connotation-alert{
        --connotation:var(--vvd-color-alert);--on-connotation:var(--vvd-color-on-alert);--connotation-soft:var(--vvd-color-alert-20);--connotation-contrast:var(--vvd-color-alert-90)
    }
    .control.connotation-warning{
        --connotation:var(--vvd-color-warning);--on-connotation:var(--vvd-color-on-warning);--connotation-soft:var(--vvd-color-warning-20);--connotation-contrast:var(--vvd-color-warning-90)
    }
    .control.connotation-info{
        --connotation:var(--vvd-color-info);--on-connotation:var(--vvd-color-on-info);--connotation-soft:var(--vvd-color-info-20);--connotation-contrast:var(--vvd-color-info-90)
    }

    /* Icon */

    .control.icon-trailing .affix {
        order: 1;
    }
`;
