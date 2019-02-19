export type NodeNameClass = 'citation' | 'comment' | 'operator' | 'rank' | 'scientific' | 'vernacular';
export declare interface NodeNamePart {
    readonly class: NodeNameClass;
    readonly text: string;
}
export declare type NodeName = ReadonlyArray<NodeNamePart>;
