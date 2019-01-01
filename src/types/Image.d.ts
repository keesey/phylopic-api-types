import { Entity } from './Entity';
import { ImagePostLinks } from './ImagePost';
import { Link } from './Link';
import { Links } from './Links';
import { MediaLink } from './MediaLink';
export declare interface ImageLinks extends ImagePostLinks, Links {
    readonly contributor: Link;
    readonly 'http://ogp.me/ns#image': MediaLink;
    readonly nodes: ReadonlyArray<Link>;
    readonly rasterFiles: ReadonlyArray<MediaLink>;
    readonly sourceFile: MediaLink;
    readonly 'twitter:image': MediaLink;
}
export declare interface Image extends Entity {
    readonly _links: ImageLinks;
    readonly attribution: string | null;
}
