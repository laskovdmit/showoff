interface IRootState {
  count: number;
}

interface IAuthStore {
  token: string | null;
}

interface ILogin {
  email: string;
  password: string;
}

export {
  IRootState,
  IAuthStore,
  ILogin,
};
