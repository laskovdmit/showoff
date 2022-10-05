<template>
  <form @submit.prevent="createAccount" class="form">
    <div class="auth__main">
      <div :class="['form__group', { 'form__group--invalid': eError }]">
        <label class="form__label" for="register-email">Почта:</label>
        <input
          v-model="email"
          @blur="eBlur"
          id="register-email"
          class="form__input"
          type="email"
          name="email"
          placeholder="Введите почту"
        />
        <small class="form__clue" v-if="eError">{{ eError }}</small>
      </div>
      <div :class="['form__group', { 'form__group--invalid': pError }]">
        <label class="form__label" for="register-pass">Пароль:</label>
        <input
          v-model="password"
          @blur="pBlur"
          id="register-pass"
          class="form__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
        />
        <small class="form__clue" v-if="pError">{{ pError }}</small>
      </div>
      <div :class="['form__group', { 'form__group--invalid': rpError }]">
        <label class="form__label" for="register-repeat-pass">Повторите пароль:</label>
        <input
          v-model="rePassword"
          @blur="rpBlur"
          id="register-repeat-pass"
          class="form__input"
          type="password"
          name="rePassword"
          placeholder="Введите пароль"
        />
        <small class="form__clue" v-if="rpError">{{ rpError }}</small>
      </div>
    </div>
    <div class="auth__footer">
      <router-link to="/login" class="btn auth__btn">Авторизация</router-link>
      <button
        type="submit"
        class="btn btn--primary auth__btn"
        :disabled="isSubmitting"
      >
        Подтвердить
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';

export default defineComponent({
  setup() {
    const MIN_LENGTH = 6;

    const schema = yup.object({
      email: yup
        .string()
        .trim()
        .required('Пожалуйста, введите email')
        .email('Необходимо ввести корректный email'),
      password: yup
        .string()
        .trim()
        .required('Пожалуйста, введите пароль')
        .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов.`),
      rePassword: yup
        .string()
        .trim()
        .required('Пожалуйста, введите пароль')
        .oneOf([yup.ref('password')], 'Пароли не совпадают'),
    });

    const { handleSubmit, isSubmitting } = useForm({ validationSchema: schema });
    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField('email');
    const { value: password, errorMessage: pError, handleBlur: pBlur } = useField('password');
    const { value: rePassword, errorMessage: rpError, handleBlur: rpBlur } = useField('rePassword');

    const createAccount = handleSubmit(async (values) => {
      console.log('Form', values);
      // try {
      //     await store.dispatch('auth/login', values);
      //     router.push('/');
      // } catch (e) {}
    });

    return {
      email,
      eError,
      eBlur,
      password,
      pError,
      pBlur,
      rePassword,
      rpError,
      rpBlur,
      isSubmitting,
      createAccount,
    };
  },
});
</script>
