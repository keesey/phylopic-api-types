import { ValidationFault } from './ValidationFault';
export declare const validateBoolean: (value: string | undefined, field: string, fieldLabel: string) => ReadonlyArray<ValidationFault>;
export default validateBoolean;
