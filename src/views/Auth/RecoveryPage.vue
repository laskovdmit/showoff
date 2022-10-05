<template>
  <form @submit.prevent="recover" class="form">
    <div class="auth__main">
      <div :class="['form__group', { 'form__group--invalid': eError }]">
        <label class="form__label" for="recovery-mail">Почта:</label>
        <input
          v-model="email"
          @blur="eBlur"
          id="recovery-mail"
          class="form__input"
          type="email"
          name="name"
          placeholder="Введите почту"
        />
        <small class="form__clue" v-if="eError">{{ eError }}</small>
      </div>
    </div>
    <div class="auth__footer">
      <router-link to="/login" class="btn auth__btn">Отмена</router-link>
      <button class="btn btn--primary auth__btn">Подтвердить</button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

export default defineComponent({
  setup() {
    const schema = yup.object({
      email: yup
        .string()
        .trim()
        .required('Пожалуйста, введите email')
        .email('Необходимо ввести корректный email'),
    });

    const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema });
    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField('email');

    const recover = () => {
      console.log('recovery');
    };
    return {
      email,
      eError,
      eBlur,
      handleSubmit,
      isSubmitting,
      recover,
    };
  },
});
</script>
