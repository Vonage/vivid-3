import { css } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { Icon } from '../icon/icon.base';

export const styles = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return css`
    .control {
        display: inline-flex;
        column-gap: 8px;
    }
.control.layout-filled,.control:not(.layout-outlined):not(.layout-soft){
    --layout-color-fill:var(--connotation);--layout-color-text:var(--on-connotation)
}
.control.layout-outlined{
    --layout-color-fill:transparent;--layout-color-outline:var(--connotation);--layout-color-text:var(--connotation-contrast)
}
.control.layout-soft{
    --layout-color-fill:var(--connotation-soft);--layout-color-text:var(--connotation-contrast)
}
:host(:not([shape=pill i])),:host([shape=rounded i]){
    --vvd-badge-shape:4px
}
:host([shape=pill i]){
    --vvd-badge-shape:14px
}
:host(:not([dense]):not([enlarged])){
    --vvd-badge--block-size:24px
}
:host([dense]){
    --vvd-badge--block-size:20px
}
:host([enlarged]){
    --vvd-badge--block-size:28px
}
.control{
    font:600 ultra-condensed 12px / 16px SpeziaWebVariable;letter-spacing:0px;text-decoration:none;text-transform:none;display:inline-flex;height:var(--vvd-badge--block-size);box-sizing:border-box;align-items:center;padding:0 10px;border:1px solid var(--layout-color-outline);background-color:var(--layout-color-fill);border-radius:var(--vvd-badge-shape);color:var(--layout-color-text);line-height:var(--vvd-badge--block-size)
}
.control.connotation-primary,.control:not(.connotation-cta):not(.connotation-success):not(.connotation-alert):not(.connotation-warning):not(.connotation-info){
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
:host([dense]) .control{
    padding:0 8px
}
:host([enlarged]) .control{
    padding:0 12px
}
    .control.icon-trailing ${iconTag} {
        order: 1;
    }
${iconTag}{
    block-size:12px;line-height:1
}
${iconTag}{
    --icon-size: 12px;--connotation:initial;vertical-align:top
}
${iconTag}.icon--leading{
    margin-inline-end:8px
}
${iconTag}.icon--trailing{
    margin-inline-start:8px
}`;
};
