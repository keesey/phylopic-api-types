import { TitledLink } from '../types/TitledLink';
import { ValidationFault } from './ValidationFault';
export declare const validateTitledLink: (link: TitledLink | null, property: string, required?: boolean) => ReadonlyArray<ValidationFault>;
export default validateTitledLink;
