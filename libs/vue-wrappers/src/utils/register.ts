import { onBeforeMount, Ref, ref } from 'vue';
import { CustomComponentPrefix } from '@/init/prefix';

/**
 * Convenience function to register component with prefix set during initialisation.
 *
 * By using the ref here, it allows us to set the prefix during app initialisation
 * so that it works for micro-frontend applications as well.
 */
export function registerComponent(type: string, registerFunction: (name: string) => void): Ref<string> {
  const componentName = ref(`${CustomComponentPrefix.value}-${type}`);
  onBeforeMount(() => {
    registerFunction(CustomComponentPrefix.value);
  });
  return componentName;
}
