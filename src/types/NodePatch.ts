import { NodeName } from './NodeName';
import { NodePostLinks } from './NodePost';
export type NodePatchLinks = Partial<NodePostLinks>;
export declare interface NodePatch {
    readonly _links?: NodePatchLinks;
    readonly names?: ReadonlyArray<NodeName>;
    readonly root?: boolean;
}
