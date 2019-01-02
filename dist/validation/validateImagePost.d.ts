import { ImagePost } from '../types/ImagePost';
import { ValidationFault } from './ValidationFault';
export declare const validateImagePost: (payload: ImagePost) => ReadonlyArray<ValidationFault>;
export default validateImagePost;
