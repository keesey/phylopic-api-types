import { ValidationFault } from './ValidationFault';
export declare const validateNodeName: (name: ReadonlyArray<import("../types/NodeName").NodeNamePart>, index: number, field?: string) => ReadonlyArray<ValidationFault>;
export default validateNodeName;
