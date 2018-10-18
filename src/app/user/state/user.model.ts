export interface User {
  id: number;
  name: string;
  country: string;
  age: number;
  languages: Array<{ code: string; level: number }>;
}

export function createUser(params: Partial<User>) {
  return {
    age: params.age,
    country: params.country,
    id: params.id,
    languages: params.languages,
    name: params.name,
  } as User;
}
