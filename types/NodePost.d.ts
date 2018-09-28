import { Link } from './Link';
import { NodeName } from './NodeName';
import { TitledLink } from './TitledLink';
export declare interface NodePostLinks {
    readonly external?: ReadonlyArray<TitledLink>;
    readonly parent_node?: Link | null;
    readonly submitter?: Link | null;
}
export declare interface NodePost {
    readonly _links?: NodePostLinks;
    readonly names: ReadonlyArray<NodeName>;
    readonly root?: boolean;
    readonly uuid?: string;
}
