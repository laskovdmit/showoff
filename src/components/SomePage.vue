<template>
  <ul class="list">
    <li
      class="list-item"
      v-for="(user, i) in users"
      :key="i"
    >
      {{ user.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useUsers from '@/use/users';

export default defineComponent({
  async setup() {
    const { users } = await useUsers();

    if (users.value) {
      users.value.forEach((user) => {
        console.log(user);
      });
    }

    return {
      users,
    };
  },
});
</script>
