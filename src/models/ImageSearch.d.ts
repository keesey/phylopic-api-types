import { Image } from './Image';
import { List } from './List';
export interface ImageSearch extends List<Image> {
    query: string;
}
