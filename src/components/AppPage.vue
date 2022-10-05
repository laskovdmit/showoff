<template>
  <h2>Это обертка для {{ title }}</h2>
  <slot/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  computed: {
    title() {
      return this.$route.name;
    },
  },
});
</script>
