import { ImagePost, ImagePostLinks } from './ImagePost';
import { Link } from './Link';
export type ImagePatchLinks = Partial<ImagePostLinks>;
export declare interface ImagePatch {
    readonly _links?: ImagePatchLinks;
    readonly attribution?: string | null;
}
