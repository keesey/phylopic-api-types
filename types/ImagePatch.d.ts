import { Link } from './Link';
export declare interface ImagePatchLinks {
    readonly general_node?: Link | null;
    readonly license?: Link;
    readonly specific_node?: Link;
}
export declare interface ImagePatch {
    readonly _links?: ImagePatchLinks;
    readonly attribution?: string | null;
}
