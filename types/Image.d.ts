import { Entity } from './Entity';
import { Link } from './Link';
import { Links } from './Links';
import { MediaLink } from './MediaLink';
export declare interface ImageLinks extends Links {
    readonly general_node: Link | null;
    readonly 'http://ogp.me/ns#image': MediaLink;
    readonly icon_file: MediaLink;
    readonly license: Link;
    readonly raster_files: ReadonlyArray<MediaLink>;
    readonly specific_node: Link;
    readonly submitter: Link;
    readonly nodes: ReadonlyArray<Link>;
    readonly thumbnail_file: MediaLink;
    readonly 'twitter:image': MediaLink;
    readonly vector_file: MediaLink | null;
}
export declare interface Image extends Entity {
    readonly _links: ImageLinks;
    readonly attribution: string | null;
}
