import { ImagePostLinks } from './ImagePost';
export declare type ImagePatchLinks = Partial<ImagePostLinks>;
export declare interface ImagePatch {
    readonly _links?: ImagePatchLinks;
    readonly attribution?: string | null;
}
