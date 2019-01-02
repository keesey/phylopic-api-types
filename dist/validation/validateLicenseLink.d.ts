import { Link } from '../types/Link';
import { ValidationFault } from './ValidationFault';
export declare const validateLicenseLink: (link: Link | null, property?: string, required?: boolean) => ReadonlyArray<ValidationFault>;
export default validateLicenseLink;
