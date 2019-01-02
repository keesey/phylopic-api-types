import { NodePatch } from '../types/NodePatch';
import { ValidationFault } from './ValidationFault';
export declare const validateNodePatch: (payload: NodePatch) => ReadonlyArray<ValidationFault>;
export default validateNodePatch;
