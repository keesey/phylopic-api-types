import { Link } from '../types/Link';
import { ValidationFault } from './ValidationFault';
export declare const validateEntityLink: (link: Link | null, property: string, entityPath: string, entityLabel: string, required?: boolean) => ReadonlyArray<ValidationFault>;
export default validateEntityLink;
