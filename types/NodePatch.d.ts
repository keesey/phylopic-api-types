import { Link } from './Link';
import { NodeName } from './NodeName';
export declare interface NodePatchLinks {
    readonly parent_node?: Link;
}
export declare interface NodePatch {
    readonly _links?: NodePatchLinks;
    readonly names?: ReadonlyArray<NodeName>;
}
