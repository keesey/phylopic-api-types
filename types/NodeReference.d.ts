import { Image } from './Image';
import { Links } from './Links';
import { NodeName } from './NodeName';
export declare interface NodeReference {
    readonly _embedded: {
        readonly primary_image: Image | null;
    };
    readonly _links: Links;
    readonly names: ReadonlyArray<NodeName>;
}
