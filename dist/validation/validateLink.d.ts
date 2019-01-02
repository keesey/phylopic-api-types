import { Link } from '../types/Link';
import { ValidationFault } from './ValidationFault';
export declare const validateLink: (link: Link | null, property: string, required?: boolean) => ReadonlyArray<ValidationFault>;
export default validateLink;
