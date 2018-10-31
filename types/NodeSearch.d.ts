import { List } from './List';
import { NodeReference } from './NodeReference';
export interface NodeSearch extends List<NodeReference> {
    query: string;
}
