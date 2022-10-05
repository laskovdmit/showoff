import { ref, Ref } from 'vue';

type FetchRequest = () => Promise<void>

interface IUsableFetch<T> {
  request: FetchRequest
  response: Ref<T | undefined>
}

export default function useFetch<T>(url: RequestInfo, options?: RequestInit): IUsableFetch<T> {
  const response = ref<T>();

  const request = async () => {
    const res = await fetch(url, options);
    response.value = await res.json();
  };

  return { response, request };
}
