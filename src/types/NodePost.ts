import { Link } from './Link';
import { NodeName } from './NodeName';
export declare interface NodePostLinks {
    readonly external?: ReadonlyArray<Link>;
    readonly parentNode: Link | null;
}
export declare interface NodePost {
    readonly _links: NodePostLinks;
    readonly names: ReadonlyArray<NodeName>;
    readonly root?: boolean;
}
