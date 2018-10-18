export interface SearchRequest {
  name: string;
  fromAge: number;
  toAge: number;
  country: string;
  languages: Array<{ code: string; level: number; relation: number }>;
}
