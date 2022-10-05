<template>
  <form @submit.prevent="logIn" class="form">
    <div class="auth__main">
      <div :class="['form__group', { 'form__group--invalid': eError }]">
        <label class="form__label" for="login-name">Почта:</label>
        <input
          v-model="email"
          @blur="eBlur"
          id="login-name"
          class="form__input"
          type="email"
          name="email"
          placeholder="Введите почту"
        />
        <small class="form__clue" v-if="eError">{{ eError }}</small>
      </div>
      <div :class="['form__group', { 'form__group--invalid': pError }]">
        <label class="form__label" for="login-password">Пароль:</label>
        <input
          v-model="password"
          @blur="pBlur"
          id="login-password"
          class="form__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
        />
        <small class="form__clue" v-if="pError">{{ pError }}</small>
      </div>
      <router-link class="auth__change-pass" to="/recovery">Не помню пароль</router-link>
    </div>
    <div class="auth__footer">
      <router-link to="/register" class="btn auth__btn">Регистрирация</router-link>
      <button
        type="submit"
        class="btn btn--primary auth__btn"
        :disabled="isSubmitting || isTooManyAttempts"
      >
        Войти
      </button>
    </div>
    <div class="form__warn" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в систему, попробуйте позже
    </div>
  </form>
</template>

<script>
import { defineComponent, computed, watch } from 'vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useStore } from '@/store/index';

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
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
    });

    const { handleSubmit, isSubmitting, submitCount } = useForm({ validationSchema: schema });
    const { value: email, errorMessage: eError, handleBlur: eBlur } = useField('email');
    const { value: password, errorMessage: pError, handleBlur: pBlur } = useField('password');

    const isTooManyAttempts = computed(() => submitCount.value >= 3);

    watch(isTooManyAttempts, (val) => {
      if (val) {
        setTimeout(() => {
          submitCount.value = 0;
        }, 3500);
      }
    });

    const logIn = handleSubmit(async (values) => {
      console.log('Form', values);

      try {
        await store.dispatch('auth/login', values);
        router.push('/lk');
      } catch (e) {
        throw new Error(e);
      }
    });

    return {
      email,
      password,
      eError,
      pError,
      eBlur,
      pBlur,
      logIn,
      isSubmitting,
      isTooManyAttempts,
    };
  },
});
</script>
