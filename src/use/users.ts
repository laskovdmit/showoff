import { ref, Ref } from 'vue';
import useFetch from '@/use/fetch';

interface IUser {
  id: number,
  name: string,
  email: string
}

type UsableUsers = Promise<{ users: Ref<IUser[] | undefined> }>

export default async function useUsers(): UsableUsers {
  const loading: Ref<boolean> = ref(false);
  const { response: users, request } = useFetch<IUser[]>('https://jsonplaceholder.typicode.com/users');

  if (!loading.value) {
    await request();
    loading.value = true;
  }

  return { users };
}
