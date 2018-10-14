export interface Profile {
  name: string;
  country: string;
  age: number;
  languages: Array<{ code: string; level: number }>;
}
