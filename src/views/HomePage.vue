<template>
  <app-page>
    <div>Привет</div>
    <button
      type="buttton"
      class="button"
      @click="logOut"
    >
      Выйти
    </button>
  </app-page>
</template>

<script lang="ts">
import AppPage from '@/components/AppPage.vue';
import { defineComponent } from 'vue';
import { useStore } from '@/store/index';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { AppPage },
  setup() {
    const store = useStore();
    const router = useRouter();

    return {
      logOut() {
        store.commit('auth/logout');
        router.push('/login');
      },
    };
  },
});
</script>
