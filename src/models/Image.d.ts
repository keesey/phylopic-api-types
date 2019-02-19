import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
import { MediaLink } from './MediaLink';
export declare interface ImageLinks extends Links {
    readonly contributor: Link;
    readonly generalNode: Link | null;
    readonly 'http://ogp.me/ns#image': MediaLink | null;
    readonly license: Link;
    readonly nodes: ReadonlyArray<Link>;
    readonly rasterFiles: ReadonlyArray<MediaLink>;
    readonly sourceFile: MediaLink;
    readonly specificNode: Link;
    readonly submission: Link;
    readonly 'twitter:image': MediaLink | null;
    readonly vectorFile: MediaLink | null;
}
export declare interface Image extends Entity {
    readonly _links: ImageLinks;
    readonly attribution: string | null;
    readonly sponsor: string | null;
}
