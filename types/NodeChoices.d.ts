import { Links } from './Links'
import { Node } from './Node'
export interface NodeChoicesEmbedded {
    readonly choices: ReadonlyArray<Node>
}
export interface NodeChoices {
    readonly _embedded: NodeChoicesEmbedded;
    readonly _links: Links;
}
