import { NodePost } from '../types/NodePost';
import { ValidationFault } from './ValidationFault';
export declare const validateNodePost: (payload: NodePost) => ReadonlyArray<ValidationFault>;
export default validateNodePost;
