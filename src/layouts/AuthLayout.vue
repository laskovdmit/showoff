<template>
  <main class="auth">
    <div class="auth__wrap">
      <router-link to="/" class="auth__logo">LOGO</router-link>
      <div class="auth__content">
        <div class="auth__header">
          <button @click="back" class="auth__arrow">
            <i class="fa-solid fa-arrow-left" />
          </button>
          <h1 class="auth__title">{{ title }}</h1>
        </div>
        <router-view/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const title = computed(() => route.meta.title);
    const back = () => router.back();

    return {
      title,
      back,
    };
  },
});
</script>
