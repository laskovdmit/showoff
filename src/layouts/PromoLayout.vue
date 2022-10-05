<template>
  <header class="header">
    <nav class="header__nav container">
      <ul class="header__list">
        <li class="header__item">
          <a href="#" class="header__link header__logo">LOGO</a>
        </li>
        <li class="header__item">
          <a href="#" class="header__link">Что это за сервис?</a>
        </li>
        <li class="header__item">
          <a href="#" class="header__link">Что он мне даст?</a>
        </li>
        <li class="header__item">
          <router-link to="/login" class="header__link">Войти</router-link>
        </li>
        <li class="header__item">
          <router-link to="/register" class="header__link">Зарегистрироваться</router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main class="container">
    <router-view/>
  </main>
  <footer class="footer">
    <div class="container">FOOTER</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
