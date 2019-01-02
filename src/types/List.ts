import { Links } from './Links';
export declare interface ListEmbedded<T> {
  readonly items: ReadonlyArray<T>;
}
export declare interface List<T> {
  readonly _embedded: ListEmbedded<T>;
  readonly _links: Links;
  readonly total: number;
}
