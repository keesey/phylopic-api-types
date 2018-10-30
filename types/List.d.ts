import { Links } from './Links';
export interface ListEmbedded<T> {
  readonly items: ReadonlyArray<T>;
}
export interface List<T> {
  readonly _embedded: ListEmbedded<T>;
  readonly _links: Links;
}
