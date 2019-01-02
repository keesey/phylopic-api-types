import { ValidationFault } from './ValidationFault';
export declare const validateDate: (query: {
    [name: string]: string;
}, field: string) => ReadonlyArray<ValidationFault>;
export default validateDate;
