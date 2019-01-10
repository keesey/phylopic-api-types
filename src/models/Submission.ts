import { ImageWithEmbedded } from './ImageWithEmbedded';
import { Link } from './Link';
import { Links } from './Links';
export declare interface SubmissionEmbedded {
    readonly image: ImageWithEmbedded;
}
export declare interface SubmissionLinks extends Links {
    readonly image: Link;
}
export declare interface Submission {
    readonly _embedded: SubmissionEmbedded;
    readonly _links: SubmissionLinks;
    readonly uuid: string;
}
