import { ref } from 'vue';

export const CustomComponentPrefix = ref('vvd3');

/**
 * Set the prefix to use for custom components.
 * Default is vvd3
 */
export function setCustomComponentPrefix(prefix: string) {
	CustomComponentPrefix.value = prefix;
}
