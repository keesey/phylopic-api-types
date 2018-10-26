import { Link } from './Link';
export declare interface ImagePostLinks {
    readonly general_node?: Link | null;
    readonly license: Link;
    readonly specific_node: Link;
}
export declare interface ImagePost {
    readonly _links: ImagePostLinks;
    readonly attribution?: string | null;
}
