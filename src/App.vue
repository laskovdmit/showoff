<template>
  <component v-if="layout" :is="layout + '-layout'"/>
</template>

<script lang="ts">
import PromoLayout from '@/layouts/PromoLayout.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const layout = computed(() => route.meta.layout);

    return {
      layout,
    };
  },
  components: { MainLayout, AuthLayout, PromoLayout },
});
</script>
