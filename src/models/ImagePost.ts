import { Link } from './Link';
export declare interface ImagePostLinks {
    readonly generalNode: Link | null;
    readonly license: Link;
    readonly sourceFile: Link;
    readonly specificNode: Link;
    readonly vectorFile: Link | null;
}
export declare interface ImagePost {
    readonly _links: ImagePostLinks;
    readonly attribution?: string | null;
    readonly sponsor?: string | null;
}
