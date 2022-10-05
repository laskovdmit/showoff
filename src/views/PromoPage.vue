<template>
  <div class="promo">Сервис для создания игровых механник в социальных сетях</div>
  <button class="buttin" @click="navigate">Логин</button>

  <p v-if="error" style="color: red;">{{ error }}</p>

  <suspense v-else>
    <template #default>
      <some-page />
    </template>
    <template #fallback>
      <p>loaging...</p>
    </template>
  </suspense>
</template>

<script lang="ts">
import { defineComponent, onErrorCaptured, ref } from 'vue';
import { useRouter } from 'vue-router';
import SomePage from '@/components/SomePage.vue';

export default defineComponent({
  setup() {
    const error = ref<null | unknown>(null);

    onErrorCaptured((e) => {
      error.value = e;
      return true;
    });

    const router = useRouter();
    return {
      navigate: () => router.push('/login'),
      error,
    };
  },
  components: { SomePage },
});
</script>
