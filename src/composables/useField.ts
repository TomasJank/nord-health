import { Input } from '@nordhealth/components';
import { ref, computed, reactive, watch } from 'vue';

export const useField = (validatorFunction: Function) => {
  const inputRef = ref<Input>();
  const additionalValue = ref('');
  const value = ref('');
  const error = ref<string>();
  const validationMessage = computed(() => validatorFunction(value.value, additionalValue.value));
  const isValid = computed(() => !validationMessage.value);

  watch(isValid, (value) => {
    if (value) {
      error.value = undefined;
    }
  });

  return reactive({
    value,
    error,
    validationMessage,
    additionalValue,
    isValid,
    focus: () => inputRef.value?.focus(),
    setRef: (el: Input) => {
      inputRef.value = el;
    }
  });
};
