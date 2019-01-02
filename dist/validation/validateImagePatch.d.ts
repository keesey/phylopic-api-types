import { ImagePatch } from '../types/ImagePatch';
import { ValidationFault } from './ValidationFault';
export declare const validateImagePatch: (payload: ImagePatch) => ReadonlyArray<ValidationFault>;
export default validateImagePatch;
